import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Exchange } from '../schemas/exchange.schema';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
@ApiTags('Exchange')
export class ExchangeController {
  private readonly validCurrencies = ['euroToEth', 'usdToEth'];

  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('rates')
  @ApiOkResponse({ description: 'Get current exchange rates', type: Exchange })
  async getExchangeRates(): Promise<Exchange> {
    return this.exchangeService.getExchangeRates();
  }

  @Put('update-rate/:currency/:rate')
  @ApiOkResponse({ description: 'Exchange rate updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid currency or rate' })
  async updateExchangeRate(
    @Param('currency') currency: string,
    @Param('rate') rate: number,
  ): Promise<string> {
    if (!this.validCurrencies.includes(currency)) {
      throw new BadRequestException('Invalid currency');
    }
    if (isNaN(rate) || rate <= 0) {
      throw new BadRequestException('Invalid rate');
    }
    return this.exchangeService.updateExchangeRate(currency, rate);
  }
}
