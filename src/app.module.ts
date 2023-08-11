import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { EtherscanModule } from './etherscan/etherscan.module';
import { ExchangeModule } from './exchange/exchange.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    WalletModule,
    ExchangeModule,
    EtherscanModule,
    MongooseModule.forRoot(process.env.MONGODB),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
