import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import AppConfig from 'configs/app.config';

@Injectable()
export class JwtService {
    private readonly jwtSecretKey = AppConfig.JWT.SECRET_KEY;

    constructor(private readonly nestJwtService: NestJwtService) {}

    async generateAccessToken(user: any): Promise<string> {
        const payload = { sub: user };
        const options = { expiresIn: AppConfig.JWT.EXPIRES_IN };
        return jwt.sign(payload, this.jwtSecretKey, options);
    }

    async verifyAccessToken(token: string): Promise<boolean> {
        try {
            jwt.verify(token, this.jwtSecretKey);
            return true;
        } catch (error) {
            return false;
        }
    }
}
