import { Injectable } from '@nestjs/common';
import * as qs from 'qs';
import { Api, ApiEndPoint } from '../api';
import { ApiConfigService } from '../../../../shared/services/api-config.service';
import { PaypalAction, UrlRequest } from './paypal.constant';

interface PaypalApiInterface {
  auth(): Promise<any>;
  createProduct(data: any): Promise<any>;
}

@Injectable()
export class PaypalApi extends Api implements PaypalApiInterface {
  constructor(private readonly apiConfig: ApiConfigService) {
    const baseUrl =
      apiConfig.nodeEnv === 'production'
        ? UrlRequest.PRODUCTION
        : UrlRequest.SANDBOX;

    super(baseUrl);
  }

  createRequestId(action: string): string {
    const localTime = new Date();
    return this.apiConfig.nodeEnv === 'production'
      ? `${action}-P-${localTime.getTime()}`
      : `${action}D-${localTime.getTime()}`;
  }

  AUTH: ApiEndPoint = { path: 'v1/oauth2/token', method: 'POST' };
  async auth() {
    const { path, method } = this.AUTH;
    const token = `${this.apiConfig.paypalConfig.clientId}:${this.apiConfig.paypalConfig.secretKey}`;
    const basicAuth = Buffer.from(token).toString('base64');

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      data: qs.stringify({
        grant_type: 'client_credentials',
      }),
    };
    return this.makeRequest(path, config, method);
  }

  CREATE_PRODUCT: ApiEndPoint = { path: 'catalogs/products', method: 'POST' };
  async createProduct(data: any) {
    const { path, method } = this.CREATE_PRODUCT;
    const authToken = await this.auth();

    const config = {
      headers: {
        Authorization: 'Bearer ' + authToken.access_token,
        'Content-Type': 'application/json',
        'Paypal-Request-Id': this.createRequestId(PaypalAction.CREATE_PRODUCT),
      },
      data: {
        name: data.productName,
        description: data.longDescription,
        type: 'SERVICE',
        category: 'SOFTWARE',
      },
    };

    return this.makeRequest(path, config, method);
  }

  PRODUCT_DETAIL: ApiEndPoint = { path: 'catalogs/products', method: 'GET' };
  async productDetail(productId: string) {
    // eslint-disable-next-line prefer-const
    let { path, method } = this.PRODUCT_DETAIL;
    path = `${path}/${productId}`;
    const authToken = await this.auth();

    const config = {
      headers: {
        Authorization: `Bearer ${authToken.access_token}`,
        'Content-Type': 'application/json',
        'Paypal-Request-Id': this.createRequestId(PaypalAction.DETAIL_PRODUCT),
      },
    };

    return this.makeRequest(path, config, method);
  }
}
