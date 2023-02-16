import { Injectable } from '@nestjs/common';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigAbstract } from '../abstract/config.abstract';

const RETRY_ATTEMPTS = 3; // retry 3 times
const DEFAULT_CONNECTION_NAME = 'MongoDD'; // default connection name

@Injectable()
export class MongooseConfigService
  extends ConfigAbstract
  implements MongooseModuleFactoryOptions
{
  createMongooseOptions(connectionName?: string) {
    return {
      uri: this.getString('MONGODB_URI'),
      retryAttempts: RETRY_ATTEMPTS,
      connectionName: connectionName || DEFAULT_CONNECTION_NAME,
    };
  }
}
