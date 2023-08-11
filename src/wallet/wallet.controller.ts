import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FavoriteDto } from '../dto/favorite.dto';
import { WalletDto } from '../dto/wallet.dto';
import { Wallet } from '../schemas/wallet.schema';
import { WalletService } from './wallet.service';

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOkResponse({ description: 'Wallet added successfully', type: Wallet })
  @ApiBadRequestResponse({ description: 'Invalid wallet data' })
  addWallet(@Body() walletDto: WalletDto) {
    return this.walletService.addWallet(walletDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of wallets', type: [Wallet] })
  getAllWallets() {
    return this.walletService.getAllWallets();
  }

  @Get('sort-favorites')
  @ApiOkResponse({ description: 'Sorted list of wallets', type: [Wallet] })
  @ApiBadRequestResponse({ description: 'Invalid order value' })
  async getAllWalletsOrderByFavorites(@Query('order') order: 'asc' | 'desc') {
    const wallets = await this.walletService.getAllWallets();
    const favoriteWallets = wallets.filter((wallet) => wallet.isFavorite);
    const nonFavoriteWallets = wallets.filter((wallet) => !wallet.isFavorite);
    const sortedWallets =
      order === 'asc'
        ? [...favoriteWallets, ...nonFavoriteWallets]
        : [...nonFavoriteWallets, ...favoriteWallets];
    return sortedWallets;
  }

  @Put('favorites')
  @ApiOkResponse({ description: 'Favorite status updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid favorite data' })
  setFavorite(@Body() favoriteDto: FavoriteDto) {
    return this.walletService.setFavorite(
      favoriteDto.address,
      favoriteDto.isFavorite,
    );
  }

  @Get('favorites')
  @ApiOkResponse({ description: 'List of favorite wallets', type: [Wallet] })
  getFavorites() {
    return this.walletService.getFavorites();
  }

  @Get(':walletAddress/balance/:currency')
  @ApiOkResponse({ description: 'Wallet balance', type: Number })
  @ApiBadRequestResponse({ description: 'Invalid wallet or currency data' })
  getWalletBalance(
    @Param('walletAddress') walletAddress: string,
    @Param('currency') currency: string,
  ) {
    return this.walletService.getWalletBalance(walletAddress, currency);
  }
}
