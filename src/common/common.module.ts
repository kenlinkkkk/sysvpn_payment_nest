import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './services/custom-logger.service';
import { StringUtils } from './services/string-utils.service';

const providers = [CustomLoggerService, StringUtils];

@Global()
@Module({
  providers: [],
  imports: [],
  exports: [...providers],
})
export class CommonModule {}
