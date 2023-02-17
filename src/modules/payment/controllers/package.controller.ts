import { Controller } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/services/custom-logger.service';

@Controller('packages')
export class PackageController {
  private logger = new CustomLoggerService(PackageController.name, true);
}
