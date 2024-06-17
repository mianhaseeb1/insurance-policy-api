import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'modules/users/users.service';
import AppConfig from 'configs/app.config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: AppConfig.JWT.SECRET_KEY,
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findByUuid(payload.uuid);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
