import { Module, RequestMethod } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { DatabaseModule } from './database/database.module';
import { PoliciesModule } from './modules/policies/policies.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import AppConfig from './configs/app.config';

@Module({
    imports: [
        LoggerModule.forRoot({
            exclude: [{ path: 'health', method: RequestMethod.ALL }],
            pinoHttp: {
                transport: ['production', 'staging'].includes(process.env.NODE_ENV)
                    ? undefined
                    : {
                          target: 'pino-pretty',
                          options: {
                              singleLine: true,
                              prettyPrint: true,
                              messageFormat: true,
                              colorize: true,
                              levelFirst: true,
                              level: AppConfig.LOG.PINO_LOG_LEVEL || 'debug',
                              translateTime: 'UTC:dd/mm/yyyy hh:MM:ss TT Z',
                          },
                      },
            },
        }),
        DatabaseModule,
        PoliciesModule,
        UsersModule,
        AuthModule,
    ],
})
export class AppModule {}
