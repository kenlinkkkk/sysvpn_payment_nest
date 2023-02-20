import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiConfigService } from '../shared/services/api-config.service';

@Injectable()
export class ParamKeyMiddleware implements NestMiddleware {
  constructor(private readonly apiConfig: ApiConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const queryParams = req.query;
    if (queryParams.key === this.apiConfig.apiKey) {
      delete queryParams.key;
      return next();
    }

    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid API Key',
    });
  }
}
