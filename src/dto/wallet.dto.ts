import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNotEmpty, IsString } from 'class-validator';

export class WalletDto {
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  @ApiProperty()
  address: string;

  @ApiProperty()
  isFavorite: boolean;

  @ApiProperty()
  isOld: boolean;
}
