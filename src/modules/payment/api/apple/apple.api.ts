import { Injectable } from '@nestjs/common';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { Api, ApiEndPoint } from '../api';
import { UrlRequest } from './apple.constant';

interface AppleApiInterface {
  verifyReceipt(payload: any): Promise<any>;
}

@Injectable()
export class AppleApi extends Api implements AppleApiInterface {
  private allowSanbox: true;
  private sharePassword: string;

  constructor(
    private readonly apiConfig: ApiConfigService,
    sharePassword: string,
  ) {
    const baseUrl =
      apiConfig.nodeEnv === 'production'
        ? UrlRequest.PRODUCTION_URL
        : UrlRequest.SANDBOX_URL;
    super(baseUrl);
    this.sharePassword = sharePassword;
  }

  VERIFY_RECEIPT: ApiEndPoint = { path: '/verifyReceipt', method: 'POST' };
  async verifyReceipt(payload: any): Promise<any> {
    const { path, method } = this.VERIFY_RECEIPT;
    const config = {
      data: {
        environment: 'sandbox',
        'exclude-old-transactions': true,
        password: this.sharePassword,
        receipt: payload.receipt,
      },
    };

    return this.makeRequest(path, config, method);
  }
}
