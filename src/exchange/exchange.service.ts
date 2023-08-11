import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exchange, ExchangeDocument } from 'src/schemas/exchange.schema';

@Injectable()
export class ExchangeService {
  private exchangeRates: ExchangeDocument;

  constructor(
    @InjectModel(Exchange.name)
    private readonly exchangeModel: Model<ExchangeDocument>,
  ) {}

  async initExchangeRates() {
    this.exchangeRates = await this.exchangeModel.findOne().exec();
    if (!this.exchangeRates) {
      // If not found in the database, create a new document
      this.exchangeRates = new this.exchangeModel({
        name: 'exchange-rates',
        euroToEth: 0.00059,
        usdToEth: 0.00054,
      });
      await this.exchangeRates.save();
    }
  }

  async getExchangeRates(): Promise<Exchange> {
    return this.exchangeModel.findOne().exec();
  }

  async updateExchangeRate(currency: string, rate: number) {
    this.exchangeRates[currency] = rate;
    await this.exchangeRates.save();
    return 'Exchange rate updated successfully';
  }
}
