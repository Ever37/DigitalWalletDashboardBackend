import { Module } from '@nestjs/common';
import { EtherscanService } from './etherscan.service';

@Module({
  controllers: [],
  providers: [EtherscanService],
})
export class EtherscanModule {}
