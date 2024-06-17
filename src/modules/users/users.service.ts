import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'database/database.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from 'dto/user.dto';
import { ResponseFormat, wrapResponse } from 'core/interfaces';
import { LoggingService } from 'modules/logging/logging.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private readonly loggingService: LoggingService,
    ) {}

    async create(data: CreateUserDto, req, res): Promise<ResponseFormat> {
        await this.loggingService.log(`Creating user with email:${data.email}`, 'user', 'create-user');
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const userData: Prisma.UserCreateInput = {
                ...data,
                password: hashedPassword,
            };
            let user;
            user = await this.prisma.user.findUnique({ where: { email: data.email } });
            if (user) {
                await this.loggingService.error(`User already exists with email:${data.email}`);
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .json(wrapResponse(HttpStatus.BAD_REQUEST, 'User already exists', false, null));
            }
            user = await this.prisma.user.create({ data: userData });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...savedUser } = user;
            await this.loggingService.log(`User created with email:${data.email}`, 'user', 'create-user');
            return res
                .status(HttpStatus.CREATED)
                .json(wrapResponse(HttpStatus.CREATED, 'User created successfully', true, savedUser));
        } catch (err) {
            await this.loggingService.error(`Error creating user with email:${data.email}`);
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(wrapResponse(HttpStatus.BAD_REQUEST, err.message, false, null));
        }
    }

    async findAll(req, res): Promise<User[]> {
        await this.loggingService.log('Fetching all users', 'user', 'fetch-all-users');
        const users = await this.prisma.user.findMany({
            select: {
                uuid: true,
                email: true,
                firstName: true,
                lastName: true,
            },
        });
        await this.loggingService.log('Fetched all users', 'user', 'fetch-all-users');
        return res.status(HttpStatus.OK).json(wrapResponse(HttpStatus.OK, 'Fetched all users', true, users));
    }

    async findOne(uuid: string, req, res): Promise<User | null> {
        await this.loggingService.log(`Fetching user with uuid:${uuid}`, 'user', 'fetch-user');
        const user = await this.prisma.user.findUnique({
            where: { uuid },
            select: { uuid: true, email: true, firstName: true, lastName: true },
        });
        if (!user) {
            await this.loggingService.error(`User not found with uuid:${uuid}`);
            return res
                .status(HttpStatus.NOT_FOUND)
                .json(wrapResponse(HttpStatus.NOT_FOUND, 'User not found', false, null));
        }
        await this.loggingService.log(`Fetched user with uuid:${uuid}`, 'user', 'fetch-user');
        return res.status(HttpStatus.OK).json(wrapResponse(HttpStatus.OK, 'Fetched user', true, user));
    }

    async findByEmail(email: string): Promise<User | null> {
        await this.loggingService.log(`Fetching user with email:${email}`, 'user', 'fetch-user');
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            await this.loggingService.error(`User not found with email:${email}`);
            return null;
        }
        await this.loggingService.log(`Fetched user with email:${email}`, 'user', 'fetch-user');
        return user;
    }

    async update(uuid: string, data: UpdateUserDto, req, res): Promise<User> {
        await this.loggingService.log(`Updating user with uuid:${uuid}`, 'user', 'update-user');
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const user = await this.prisma.user.update({
            where: { uuid },
            data,
            select: { uuid: true, email: true, firstName: true, lastName: true },
        });
        await this.loggingService.log(`Updated user with uuid:${uuid}`, 'user', 'update-user');
        return res.status(HttpStatus.OK).json(wrapResponse(HttpStatus.OK, 'User updated successfully', true, user));
    }

    async remove(uuid: string, req, res): Promise<User> {
        await this.loggingService.log(`Deleting user with uuid:${uuid}`, 'user', 'delete-user');
        const user = await this.prisma.user.delete({ where: { uuid } });
        await this.loggingService.log(`Deleted user with uuid:${uuid}`, 'user', 'delete-user');
        return res.status(HttpStatus.OK).json(wrapResponse(HttpStatus.OK, 'User deleted successfully', true, user));
    }

    async findByUuid(uuid: string): Promise<User | null> {
        await this.loggingService.log(`Fetching user with uuid:${uuid}`, 'user', 'fetch-user');
        const user = await this.prisma.user.findUnique({ where: { uuid } });
        if (!user) {
            await this.loggingService.error(`User not found with uuid:${uuid}`);
            return null;
        }
        await this.loggingService.log(`Fetched user with uuid:${uuid}`, 'user', 'fetch-user');
        return user;
    }
}
