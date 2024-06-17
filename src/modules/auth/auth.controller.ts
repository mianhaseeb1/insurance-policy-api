import { Controller, Post, Body, Req, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from 'dto/auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiBody({ type: LoginDto })
    @Post('login')
    async login(@Request() req, @Res() res: Response, @Body() loginDto: LoginDto) {
        return this.authService.login(loginDto, req, res);
    }

    @ApiBody({ type: RegisterDto })
    @Post('register')
    async register(@Request() req, @Res() res: Response, @Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto, req, res);
    }
}
