import {IsNotEmpty, IsString, MinLength, IsInt, Min} from 'class-validator';
import {UserRole} from '../entities/user.entity';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsInt()
    @Min(13)
    age: number;

    role: UserRole;
}