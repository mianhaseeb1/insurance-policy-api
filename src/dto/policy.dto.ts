import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreatePolicyDto {
    @ApiProperty()
    @IsString()
    policyNumber: string;

    @ApiProperty()
    @IsString()
    holderName: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @ApiProperty()
    @IsNumber()
    premium: number;
}

export class UpdatePolicyDto {
    @ApiProperty()
    @IsString()
    policyNumber?: string;

    @ApiProperty()
    @IsString()
    holderName?: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    startDate?: Date;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    endDate?: Date;

    @ApiProperty()
    @IsNumber()
    premium?: number;
}
