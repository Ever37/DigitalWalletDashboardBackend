import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEthereumAddress,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class FavoriteDto {
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isFavorite: boolean;
}
