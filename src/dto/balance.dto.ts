import { ApiProperty } from '@nestjs/swagger';
import {
  IsEthereumAddress,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class BalanceDto {
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['EUR', 'USD'])
  @ApiProperty()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  balance: number;
}
