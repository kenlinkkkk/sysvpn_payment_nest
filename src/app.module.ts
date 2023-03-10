import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { MongooseConfigService } from './shared/services/mongoose-config.service';
import { CommonModule } from './common/common.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ParamKeyMiddleware } from './middleware/all-routes.middleware';

const globalModule = [SharedModule, CommonModule];

const loadModule = [PaymentModule];
@Module({
  imports: [
    ...globalModule,
    ...loadModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ParamKeyMiddleware).forRoutes('*');
  }
}
