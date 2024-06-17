import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'helpers/jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'database/database.module';
import AppConfig from 'configs/app.config';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: AppConfig.JWT.SECRET_KEY,
            signOptions: { expiresIn: AppConfig.JWT.EXPIRES_IN },
        }),
        DatabaseModule,
    ],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
