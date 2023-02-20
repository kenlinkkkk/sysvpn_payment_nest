import { Injectable } from '@nestjs/common';
import { Api, ApiEndPoint } from '../api';

interface GooglePurchaseApiInterface {
  tokenVerify(): Promise<any>;
  arknownledge(): Promise<any>;
}

@Injectable()
export class GooglePurchaseApi
  extends Api
  implements GooglePurchaseApiInterface
{
  TOKEN_VERIFY: ApiEndPoint = { path: '', method: 'POST' };
  tokenVerify(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  arknownledge(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
