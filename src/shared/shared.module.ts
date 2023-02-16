import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { MongooseConfigService } from './services/mongoose-config.service';

const providers = [ApiConfigService, MongooseConfigService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
