import { Injectable } from '@nestjs/common';
import { Method } from 'axios';
import { google } from 'googleapis';
import * as config from 'src/config/google.config.json';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { OAUTH_SCOPE, URL_PARTTERN } from './google-purchase.constant';
import * as util from 'util';
import axios from 'axios';
import { ApiError } from 'src/utils/ApiError';

interface GooglePurchaseApiInterface {
  tokenVerify(): Promise<any>;
  arknownledge(): Promise<any>;
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
      // console.log(error);
    }
  }

  async makeRequest(config: any, method: Method): Promise<any> {
    const authToken = await this.authWithJWT();
    const urlRequest = util.format(
      URL_PARTTERN,
      encodeURIComponent(config.packageName),
      encodeURIComponent(config.productId),
      encodeURIComponent(config.purchaseToken),
    );
    try {
      const responseAxios = await axios({
        url: urlRequest,
        method: method,
        headers: {
          authorization: `Bearer ${authToken.access_token}`,
        },
      });
      return responseAxios.data;
    } catch (error) {
    }
  }

  async tokenVerify(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async arknownledge(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
