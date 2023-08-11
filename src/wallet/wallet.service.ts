import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EtherscanService, SortOption } from 'src/etherscan/etherscan.service';
import { ExchangeService } from 'src/exchange/exchange.service';
import { Wallet } from 'src/schemas/wallet.schema';
import { isDateGreaterThanOneYear, weiToEth } from 'src/util/ethUtils';
import { BalanceDto } from '../dto/balance.dto';
import { WalletDto } from '../dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<Wallet>,
    private readonly exchangeService: ExchangeService,
    private readonly etherscanService: EtherscanService,
  ) {}

  async isWalletOld(wallet: Wallet): Promise<boolean> {
    const transactions = await this.etherscanService.getTransactionsByAddress(
      wallet.address,
      SortOption.DESC,
    );
    if (transactions.length === 0) return false;
    const timestamp = parseInt(transactions[0].timeStamp);
    return isDateGreaterThanOneYear(timestamp);
  }

  async mapToDto(wallet: Wallet): Promise<WalletDto> {
    const walletDto = new WalletDto();
    walletDto.address = wallet.address;
    walletDto.isFavorite = wallet.isFavorite;
    walletDto.isOld = await this.isWalletOld(wallet);
    return walletDto;
  }

  async getAllWallets(): Promise<WalletDto[]> {
    const walletsDto: WalletDto[] = [];
    const wallets = await this.walletModel.find().exec();
    for (const wallet of wallets) {
      const walletDto = await this.mapToDto(wallet);
      walletsDto.push(walletDto);
    }
    return walletsDto;
  }

  async addWallet(walletDto: WalletDto): Promise<Wallet> {
    const wallet = new this.walletModel(walletDto);
    return wallet.save();
  }

  async setFavorite(address: string, isFavorite: boolean): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({ address }).exec();
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    wallet.isFavorite = isFavorite;
    return wallet.save();
  }

  async getFavorites(): Promise<Wallet[]> {
    return this.walletModel.find({ isFavorite: true }).exec();
  }

  // TODO: Review method
  async getWalletBalance(
    walletAddress: string,
    currency: string,
  ): Promise<BalanceDto> {
    const wallet = await this.etherscanService.getWalletInfo(walletAddress);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    const exchangeRates = await this.exchangeService.getExchangeRates();

    let balanceInSelectedCurrency;
    switch (currency) {
      case 'EUR':
        balanceInSelectedCurrency =
          weiToEth(wallet.result) * exchangeRates.euroToEth;
        break;
      case 'USD':
        balanceInSelectedCurrency =
          weiToEth(wallet.result) * exchangeRates.usdToEth;
        break;
      default:
        throw new NotFoundException('Invalid currency');
    }
    return {
      address: walletAddress,
      currency,
      balance: balanceInSelectedCurrency,
    };
  }
}
