import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TimeUnit } from '../constants/payment.constants';

export type PackageDocument = HydratedDocument<Package>;

@Schema({ collection: 'packages' })
export class Package {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  productCode: string;

  @Prop({ required: true })
  productType: string;

  @Prop()
  productId: string;

  @Prop({ default: true })
  enabled: boolean;

  @Prop({ required: true })
  priceRegular: number;

  @Prop({ required: true })
  priceRenewal: number;

  @Prop({ default: 1 })
  billingCycle: number;

  @Prop({ default: TimeUnit.Month })
  billingCycleUnit: string;

  @Prop({ default: 7 })
  trialValue: number;

  @Prop({ default: TimeUnit.Day })
  trialUnit: string;

  @Prop({ default: true })
  isSubscription: boolean;

  @Prop({ default: false })
  isRecommended: boolean;

  @Prop({ default: false })
  isBaseProduct: boolean;

  @Prop()
  sortPosition: number;

  @Prop()
  noteInfo: string;

  @Prop()
  shortDescription: string;

  @Prop()
  longDescription: string;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
