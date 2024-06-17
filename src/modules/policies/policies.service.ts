import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'database/database.service';
import { Policy } from '@prisma/client';

import { CreatePolicyDto, UpdatePolicyDto } from 'dto/policy.dto';
import { wrapResponse } from 'core/interfaces';
import { LoggingService } from 'modules/logging/logging.service';

@Injectable()
export class PoliciesService {
    constructor(
        private prisma: PrismaService,
        private loggingService: LoggingService,
    ) {}

    async create(data: CreatePolicyDto, userId, req, res): Promise<Policy> {
        await this.loggingService.log(`Creating policy with number:${data.policyNumber}`, 'policy', 'create-policy');
        try {
            const policyData = {
                ...data,
                userId,
            };
            const policy = await this.prisma.policy.create({ data: policyData });
            await this.loggingService.log(`Policy created with number:${data.policyNumber}`, 'policy', 'create-policy');
            return res
                .status(HttpStatus.CREATED)
                .json(wrapResponse(HttpStatus.CREATED, 'Policy created successfully', true, policy));
        } catch (err) {
            await this.loggingService.error(`Error creating policy with number:${data.policyNumber}`);
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(wrapResponse(HttpStatus.BAD_REQUEST, err.message, false, null));
        }
    }

    async findAll(req, res): Promise<Policy[]> {
        await this.loggingService.log('Fetching all policies', 'policy', 'fetch-all-policies');
        try {
            const policies = await this.prisma.policy.findMany();
            await this.loggingService.log('Fetched all policies', 'policy', 'fetch-all-policies');
            return res.status(HttpStatus.OK).json(wrapResponse(HttpStatus.OK, 'Fetched all policies', true, policies));
        } catch (err) {
            await this.loggingService.error('Error fetching all policies');
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(wrapResponse(HttpStatus.BAD_REQUEST, err.message, false, null));
        }
    }

    async findOne(uuid: string, req, res): Promise<Policy | null> {
        await this.loggingService.log(`Fetching policy with uuid:${uuid}`, 'policy', 'fetch-policy');
        try {
            const policy = await this.prisma.policy.findUnique({ where: { uuid } });
            if (!policy) {
                await this.loggingService.error(`Policy not found with uuid:${uuid}`);
                return res
                    .status(HttpStatus.NOT_FOUND)
                    .json(wrapResponse(HttpStatus.NOT_FOUND, 'Policy not found', false, null));
            }
            await this.loggingService.log(`Fetched policy with uuid:${uuid}`, 'policy', 'fetch-policy');
            return res.status(HttpStatus.OK).json(wrapResponse(HttpStatus.OK, 'Fetched policy', true, policy));
        } catch (err) {
            await this.loggingService.error(`Error fetching policy with uuid:${uuid}`);
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(wrapResponse(HttpStatus.BAD_REQUEST, err.message, false, null));
        }
    }

    async update(uuid: string, data: UpdatePolicyDto, req, res): Promise<Policy> {
        await this.loggingService.log(`Updating policy with uuid:${uuid}`, 'policy', 'update-policy');
        try {
            const policy = await this.prisma.policy.update({ where: { uuid }, data });
            await this.loggingService.log(`Policy updated with uuid:${uuid}`, 'policy', 'update-policy');
            return res
                .status(HttpStatus.OK)
                .json(wrapResponse(HttpStatus.OK, 'Policy updated successfully', true, policy));
        } catch (err) {
            await this.loggingService.error(`Error updating policy with uuid:${uuid}`);
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(wrapResponse(HttpStatus.BAD_REQUEST, err.message, false, null));
        }
    }

    async remove(uuid: string, req, res): Promise<Policy> {
        await this.loggingService.log(`Deleting policy with uuid:${uuid}`, 'policy', 'delete-policy');
        try {
            const policy = await this.prisma.policy.delete({ where: { uuid } });
            await this.loggingService.log(`Policy deleted with uuid:${uuid}`, 'policy', 'delete-policy');
            return res
                .status(HttpStatus.OK)
                .json(wrapResponse(HttpStatus.OK, 'Policy deleted successfully', true, policy));
        } catch (err) {
            await this.loggingService.error(`Error deleting policy with uuid:${uuid}`);
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(wrapResponse(HttpStatus.BAD_REQUEST, err.message, false, null));
        }
    }
}
