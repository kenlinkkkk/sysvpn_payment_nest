import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { CustomLoggerService } from './common/services/custom-logger.service';
import { AllExceptionFilter } from './exceptions/all-filter.exception';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new CustomLoggerService(),
  });

  const apiConfig = app.select(SharedModule).get(ApiConfigService);
  CustomLoggerService.setGlobalPrefix(apiConfig.appConfig.applicationName);
  //helmet enabled
  app.use(helmet());
  //global exception filter
  app.useGlobalFilters(new AllExceptionFilter());
  //set prefix api
  app.setGlobalPrefix(`${apiConfig.apiPrefix}/${apiConfig.apiVersion}`);
  //default listen port
  await app.listen(apiConfig.appConfig.port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
