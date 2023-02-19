import { Injectable } from '@nestjs/common';
import { ConfigAbstract } from '../abstract/config.abstract';

@Injectable()
export class ApiConfigService extends ConfigAbstract {
  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get appConfig() {
    return {
      applicationName: this.getString('APPLICATION_NAME'),
      port: this.getNumber('PORT'),
    };
  }

  get apiPrefix() {
    return this.getString('API_PREFIX');
  }

  get apiVersion() {
    return `${this.getString('API_VERSION')}`;
  }

  get telegramToken() {
    return {
      token: this.getString('TELEGRAM_TOKEN'),
    };
  }

  get paypalConfig() {
    return {
      clientId: this.getString('PAYPAL_CLIENT_ID'),
      secretKey: this.getString('PAYPAL_SECRET_KEY'),
    };
  }
}
