import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Request, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto, UpdatePolicyDto } from 'dto/policy.dto';

@ApiTags('policies')
@Controller('policies')
export class PoliciesController {
    constructor(private readonly policiesService: PoliciesService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CreatePolicyDto })
    @Post()
    create(@Request() req, @Res() res: Response, @Body() createPolicyDto: CreatePolicyDto) {
        const user = req.user;
        return this.policiesService.create(createPolicyDto, user.uuid, req, res);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req, @Res() res: Response) {
        return this.policiesService.findAll(req, res);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'uuid', type: String })
    @Get(':uuid')
    findOne(@Request() req, @Res() res: Response, @Param('uuid') uuid: string) {
        return this.policiesService.findOne(uuid, req, res);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: UpdatePolicyDto })
    @ApiParam({ name: 'uuid', type: String })
    @Patch(':uuid')
    update(
        @Request() req,
        @Res() res: Response,
        @Param('uuid') uuid: string,
        @Body() updatePolicyDto: UpdatePolicyDto,
    ) {
        return this.policiesService.update(uuid, updatePolicyDto, req, res);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'uuid', type: String })
    @Delete(':uuid')
    remove(@Request() req, @Res() res: Response, @Param('uuid') uuid: string) {
        return this.policiesService.remove(uuid, req, res);
    }
}
