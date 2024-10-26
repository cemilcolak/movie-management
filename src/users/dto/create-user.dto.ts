import {IsNotEmpty, IsString, MinLength, IsInt, Min} from 'class-validator';
import {UserRole} from '../entities/user.entity';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(13)
    age: number;

    role: UserRole;
}