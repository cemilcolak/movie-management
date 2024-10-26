import {IsDateString, IsEnum, IsInt, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export enum TimeSlot {
    SLOT_10_12 = '10:00-12:00',
    SLOT_12_14 = '12:00-14:00',
    SLOT_14_16 = '14:00-16:00',
    SLOT_16_18 = '16:00-18:00',
    SLOT_18_20 = '18:00-20:00',
    SLOT_20_22 = '20:00-22:00',
    SLOT_22_00 = '22:00-00:00',
}

export class CreateSessionDto {
    @ApiProperty({description: 'Date of the session', type: String, format: 'date-time'})
    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({description: 'Time slot of the session', enum: TimeSlot})
    @IsEnum(TimeSlot)
    @IsNotEmpty()
    timeSlot: TimeSlot;

    @ApiProperty({description: 'Room number for the session'})
    @IsInt()
    @IsNotEmpty()
    roomNumber: number;
}