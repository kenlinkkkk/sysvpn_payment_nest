import { Module } from '@nestjs/common';
import { PaypalApi } from './api';
import { PackageController, PaymentsController } from './controllers';
import { PackageService, PaymentService, SubscriberService } from './services';

const ApiService = [PaypalApi];

const ModelService = [PackageService, PaymentService, SubscriberService];

const Controllers = [PaymentsController, PackageController];
@Module({
  imports: [],
  providers: [...ApiService, ...ModelService],
  controllers: [...Controllers],
})
export class PaymentModule {}
