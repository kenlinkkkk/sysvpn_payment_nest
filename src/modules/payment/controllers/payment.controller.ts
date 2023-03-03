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
        'iiflobnbhalpmcgjenmbahnn.AO-J1OyU03tZIhMyq9xdL6wIwjUBdh2tNZaKU1JdbizntLlvGTUJHcnV-yxG0EauwRf6SG0o5HwIb1IfGGNp_vu4HK2jcpzM4wRRHWQ59mfRXvRPqSA_kM8',
      type: 'GOOGLE_INAPP',
    };
    const test = await this.PaypalApiService.get(config);
    this.logger.log(test, 'Test');
    return res.status(HttpStatus.OK).json(test);
  }
}
