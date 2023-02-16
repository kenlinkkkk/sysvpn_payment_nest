import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SharedModule } from './shared/shared.module';
import { MongooseConfigService } from './shared/services/mongoose-config.service';

const globalModule = [SharedModule, CommonModule];
@Module({
  imports: [
    ...globalModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
})
export class AppModule {}
