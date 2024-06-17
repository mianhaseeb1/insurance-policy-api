import { Module } from '@nestjs/common';
import { LoggingController } from './logging.controller';
import { LoggingService } from './logging.service';
import { Logger } from 'nestjs-pino';

@Module({
    imports: [],
    controllers: [LoggingController],
    providers: [LoggingService, Logger],
    exports: [LoggingService],
})
export class LoggingModule {}
