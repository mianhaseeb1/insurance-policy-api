import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Res } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from 'dto/user.dto';
import { ApiTags, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiBearerAuth()
    @ApiBody({ type: CreateUserDto })
    @Post()
    create(@Request() req, @Res() res: Response, @Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto, req, res);
    }
    @ApiBearerAuth()
    @Get()
    findAll(@Request() req, @Res() res: Response) {
        return this.usersService.findAll(req, res);
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'uuid', type: String })
    @Get(':uuid')
    findOne(@Request() req, @Res() res: Response, @Param('uuid') uuid: string) {
        return this.usersService.findOne(uuid, req, res);
    }

    @ApiBearerAuth()
    @ApiBody({ type: UpdateUserDto })
    @ApiParam({ name: 'uuid', type: String })
    @Patch(':uuid')
    update(@Param('uuid') uuid: string, @Request() req, @Res() res: Response, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(uuid, updateUserDto, req, res);
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'uuid', type: String })
    @Delete(':uuid')
    remove(@Param('uuid') uuid: string, @Request() req, @Res() res: Response) {
        return this.usersService.remove(uuid, req, res);
    }
}
