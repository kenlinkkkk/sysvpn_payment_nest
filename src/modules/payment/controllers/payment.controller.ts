import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/services/custom-logger.service';
import { Response } from 'express';
import { PaypalApi } from '../api';

@Controller('payments')
export class PaymentsController {
  private logger = new CustomLoggerService(PaymentsController.name, true);

  constructor(private readonly PaypalApiService: PaypalApi) {}

  @Get()
  async Test(@Res() res: Response) {
    const test = await this.PaypalApiService.auth();
    this.logger.log(test, 'Test');
    return res.status(HttpStatus.OK).json(test);
  }
}
