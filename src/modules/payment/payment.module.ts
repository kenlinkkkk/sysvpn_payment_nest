import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GooglePurchaseApi, PaypalApi } from './api';
import { PackageController, PaymentsController } from './controllers';
import {
  PackageSchema,
  PaymentSchema,
  SubscriberSchema,
  Payment,
  Package,
  Subscriber,
} from './models';
import { PackageService, PaymentService, SubscriberService } from './services';

const ApiService = [PaypalApi, GooglePurchaseApi];

const ModelService = [PackageService, PaymentService, SubscriberService];

const Controllers = [PaymentsController, PackageController];
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Package.name,
        schema: PackageSchema,
      },
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
      {
        name: Subscriber.name,
        schema: SubscriberSchema,
      },
    ]),
  ],
  providers: [...ApiService, ...ModelService],
  controllers: [...Controllers],
})
export class PaymentModule {}
