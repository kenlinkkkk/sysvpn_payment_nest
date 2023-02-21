import { Injectable } from '@nestjs/common';
import { Api, ApiEndPoint } from '../api';
import { google, Auth } from 'googleapis';
import { GoogleConfig } from './google-purchase.constant';
import { ApiConfigService } from 'src/shared/services/api-config.service';

interface GooglePurchaseApiInterface {
  tokenVerify(): Promise<any>;
  arknownledge(): Promise<any>;
}

@Injectable()
export class GooglePurchaseApi implements GooglePurchaseApiInterface {
  static OAUTH_SCOPE = ['https://www.googleapis.com/auth/androidpublisher'];

  constructor(private readonly ApiConfig: ApiConfigService) {}

  async auth(): Promise<any> {
    const oauthClient = new google.auth.OAuth2(
      GoogleConfig.client_id,
      GoogleConfig.private_key,
    );

    return oauthClient;
  }

  TOKEN_VERIFY: ApiEndPoint = { path: '', method: 'POST' };
  async tokenVerify(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async arknownledge(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
