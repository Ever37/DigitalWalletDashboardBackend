import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exchange, ExchangeSchema } from 'src/schemas/exchange.schema';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exchange.name, schema: ExchangeSchema },
    ]),
  ],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule implements OnModuleInit {
  constructor(private readonly exchangeService: ExchangeService) {}

  async onModuleInit() {
    await this.exchangeService.initExchangeRates();
  }
}
