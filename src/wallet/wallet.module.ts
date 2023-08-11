import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EtherscanModule } from 'src/etherscan/etherscan.module';
import { EtherscanService } from 'src/etherscan/etherscan.service';
import { ExchangeModule } from 'src/exchange/exchange.module';
import { ExchangeService } from 'src/exchange/exchange.service';
import { Exchange, ExchangeSchema } from 'src/schemas/exchange.schema';
import { Wallet, WalletSchema } from 'src/schemas/wallet.schema';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    MongooseModule.forFeature([
      { name: Exchange.name, schema: ExchangeSchema },
    ]),
    ExchangeModule,
    EtherscanModule,
  ],
  providers: [WalletService, ExchangeService, EtherscanService],
  controllers: [WalletController],
})
export class WalletModule {}
