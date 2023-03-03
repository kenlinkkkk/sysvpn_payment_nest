import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ItemStatus } from '../constants/payment.constants';

export type SubscriberDocument = HydratedDocument<Subscriber>;

@Schema({ collection: 'subscribers' })
export class Subscriber {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  typePurchased: string;

  @Prop({ required: true })
  lastActivePaymentId: string;

  @Prop({ required: true, default: ItemStatus.Active })
  userStatus: number;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
