import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggingService } from './logging.service';

@Controller('logging')
@ApiTags('Logging')
export class LoggingController {
    constructor(private readonly loggingService: LoggingService) {}
}
