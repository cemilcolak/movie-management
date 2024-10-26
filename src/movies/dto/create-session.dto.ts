import {IsString, IsNotEmpty} from 'class-validator';

export class CreateSessionDto {
    @IsString()
    @IsNotEmpty()
    date: string; // Use an appropriate format (e.g., YYYY-MM-DD)

    @IsString()
    @IsNotEmpty()
    timeSlot: string;

    @IsString()
    @IsNotEmpty()
    roomNumber: string;
}