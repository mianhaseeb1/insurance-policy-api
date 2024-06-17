import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { DatabaseModule } from 'database/database.module';
import { LoggingModule } from 'modules/logging/logging.module';

@Module({
    imports: [DatabaseModule, LoggingModule],
    controllers: [PoliciesController],
    providers: [PoliciesService],
})
export class PoliciesModule {}
