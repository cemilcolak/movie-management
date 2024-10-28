import {IsNotEmpty, IsEmail} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateTicketDto {
    @ApiProperty({description: 'Customer Name'})
    @IsNotEmpty()
    customerName: string;

    @ApiProperty({description: 'Customer Email'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({description: 'Session ID'})
    @IsNotEmpty()
    sessionId: number; // Reference to the session the ticket is for
}