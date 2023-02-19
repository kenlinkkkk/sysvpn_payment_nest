import { Injectable } from '@nestjs/common';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigAbstract } from '../abstract/config.abstract';

const RETRY_ATTEMPTS = 3; // retry 3 times

@Injectable()
export class MongooseConfigService
  extends ConfigAbstract
  implements MongooseModuleFactoryOptions
{
  createMongooseOptions() {
    return {
      uri: this.getString('MONGODB_URI'),
      retryAttempts: RETRY_ATTEMPTS,
    };
  }
}
