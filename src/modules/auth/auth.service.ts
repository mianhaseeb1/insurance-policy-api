import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'modules/users/users.service';
import { RegisterDto, LoginDto } from 'dto/auth.dto';
import AppConfig from 'configs/app.config';
import { wrapResponse } from 'core/interfaces';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    public async _generateAccessToken(user: any): Promise<any> {
        const payload = {
            uuid: user.uuid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        const expiresIn = AppConfig.JWT.EXPIRES_IN;
        return this.jwtService.sign(payload, { expiresIn });
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto, req, res) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json(wrapResponse(HttpStatus.UNAUTHORIZED, 'Invalid credentials', false, null));
        }
        const token = await this._generateAccessToken(user);
        return res.status(HttpStatus.OK).json(
            wrapResponse(HttpStatus.OK, 'Login successful', true, {
                access_token: token,
            }),
        );
    }

    async register(registerDto: RegisterDto, req, res) {
        return this.usersService.create(registerDto, req, res);
    }
}
