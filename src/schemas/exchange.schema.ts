import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExchangeDocument = Exchange & Document;

@Schema()
export class Exchange {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  euroToEth: number;

  @Prop({ required: true })
  usdToEth: number;
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
