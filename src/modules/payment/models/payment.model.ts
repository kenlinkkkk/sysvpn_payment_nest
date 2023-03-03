import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { PaymentStatus } from '../constants/payment.constants';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ collection: 'payments' })
export class Payment {
  @Prop()
  userEmail: string;

  @Prop()
  userId: string;

  @Prop()
  typePurchased: string;

  @Prop()
  orderId: string;

  @Prop()
  chargeCurrency: string;

  @Prop()
  totalCharge: number;

  @Prop({ required: true, type: Object })
  packageCharge: any;

  @Prop({ default: PaymentStatus.Pending })
  status: string;

  @Prop({ type: Object })
  requestCharge: any;

  @Prop({ type: Object })
  responseCharge: any;

  @Prop({ type: Object })
  hookResponse: any;

  @Prop()
  subscriptionId: string;

  @Prop()
  purchaseToken: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  paymentDate: Date;

  @Prop({ type: Date })
  expireDate: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
