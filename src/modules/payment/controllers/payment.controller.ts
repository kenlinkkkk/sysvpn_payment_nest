import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/services/custom-logger.service';
import { Response } from 'express';
import { GooglePurchaseApi } from '../api';

@Controller('payments')
export class PaymentsController {
  private logger = new CustomLoggerService(PaymentsController.name, true);

  constructor(private readonly PaypalApiService: GooglePurchaseApi) {}

  @Get()
  async Test(@Res() res: Response) {
    const config = {
      packageName: 'com.sysvpn.client.android',
      productId: 'monthly_trial',
      purchaseToken:
        'aegmjheffkdpdohlgdgjaofd.AO-J1Oxsh2xb4uOIuBwGLY1g7KGslpYUS-91DgZhJnwl2-0DFLIg8YjVOqtgivsanx-PX-r5bv1fzRephllaD285oKqE9ys2Z26DX2r1Vlh6LqwTFwUxZC',
      type: 'GOOGLE_INAPP',
    };
    const test = await this.PaypalApiService.makeRequest(config, 'GET');
    this.logger.log(test, 'Test');
    return res.status(HttpStatus.OK).json(test);
  }
}
