import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class LoginAuthDto {
    @ApiProperty({description: 'Username of the user'})
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({description: 'Password of the user'})
    @IsString()
    @IsNotEmpty()
    password: string;
}