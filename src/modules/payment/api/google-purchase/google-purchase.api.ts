import { Injectable } from '@nestjs/common';
import { Method } from 'axios';
import { google } from 'googleapis';
import * as config from 'src/config/google.config.json';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { OAUTH_SCOPE, URL_PARTTERN } from './google-purchase.constant';
import * as util from 'util';
import axios from 'axios';
import { UrlRequest } from '../paypal/paypal.constant';

interface GooglePurchaseApiInterface {
  acknownledge(payload: PayloadRequest): Promise<any>;
  get(payload: PayloadRequest): Promise<any>;
  defer(payload: PayloadRequest): Promise<any>;
  refund(payload: PayloadRequest): Promise<any>;
  revoke(payload: PayloadRequest): Promise<any>;
  cancel(payload: PayloadRequest): Promise<any>;
}
interface ConfigInterface {
  data?: string | FormData | string[][];
  params?: string | string[][];
}

interface PayloadRequest {
  packageName: string;
  productId: string;
  purchaseToken: string;
}
@Injectable()
export class GooglePurchaseApi implements GooglePurchaseApiInterface {
  constructor(private readonly ApiConfig: ApiConfigService) {}

  async authWithJWT(): Promise<any> {
    try {
      const oauthClient = new google.auth.JWT({
        email: config.client_email,
        key: config.private_key,
        scopes: OAUTH_SCOPE,
      });
      const authInfo = oauthClient.authorize();
      return authInfo;
    } catch (error) {
      console.log(error);
    }
  }

  private async makeRequest(
    urlRequest: string,
    method: Method,
    config?: ConfigInterface,
  ): Promise<any> {
    const authToken = await this.authWithJWT();
    try {
      const responseAxios = await axios({
        url: urlRequest,
        method: method,
        headers: {
          authorization: `Bearer ${authToken.access_token}`,
        },
        ...config,
      });
      return responseAxios.data;
    } catch (error) {
      return error.response.data;
    }
  }

  private makeUrlRequest(payload: PayloadRequest, transcode?: string): string {
    return util.format(
      URL_PARTTERN,
      encodeURIComponent(payload.packageName),
      encodeURIComponent(payload.productId),
      encodeURIComponent(payload.purchaseToken),
      transcode,
    );
  }

  DEFER_PURCHASE_TOKEN = { method: 'POST', transcode: ':derfer' };
  async defer(payload: PayloadRequest): Promise<any> {
    const { method, transcode } = this.DEFER_PURCHASE_TOKEN;
    const urlRequest = this.makeUrlRequest(payload, transcode);
    return this.makeRequest(urlRequest, method as Method);
  }

  REFUND_PURCHASE_TOKEN = { method: 'POST', transcode: ':refund' };
  async refund(payload: PayloadRequest): Promise<any> {
    const { method, transcode } = this.DEFER_PURCHASE_TOKEN;
    const urlRequest = this.makeUrlRequest(payload, transcode);
    return this.makeRequest(urlRequest, method as Method);
  }

  REVOKE_PURCHASE_TOKEN = { method: 'POST', transcode: ':revoke' };
  async revoke(payload: PayloadRequest): Promise<any> {
    const { method, transcode } = this.DEFER_PURCHASE_TOKEN;
    const urlRequest = this.makeUrlRequest(payload, transcode);
    return this.makeRequest(urlRequest, method as Method);
  }

  CANCEL_PURCHASE_TOKEN = { method: 'POST', transcode: ':cancel' };
  async cancel(payload: PayloadRequest): Promise<any> {
    const { method, transcode } = this.DEFER_PURCHASE_TOKEN;
    const urlRequest = this.makeUrlRequest(payload, transcode);
    return this.makeRequest(urlRequest, method as Method);
  }

  GET_INFO_PURCHASE_TOKEN = { method: 'GET', transcode: '' };
  async get(payload: PayloadRequest): Promise<any> {
    const { method, transcode } = this.DEFER_PURCHASE_TOKEN;
    const urlRequest = this.makeUrlRequest(payload, transcode);
    return this.makeRequest(urlRequest, method as Method);
  }

  ACKNOWNLEDGE_PURCHASE_TOKEN = { method: 'POST', transcode: ':acknowledge' };
  async acknownledge(payload: PayloadRequest): Promise<any> {
    const { method, transcode } = this.DEFER_PURCHASE_TOKEN;
    const urlRequest = this.makeUrlRequest(payload, transcode);
    return this.makeRequest(urlRequest, method as Method);
  }
}
