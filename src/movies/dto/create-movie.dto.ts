import {IsString, IsInt, IsNotEmpty, IsArray, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {CreateSessionDto} from './create-session.dto';

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    ageRestriction: number;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateSessionDto)
    sessions: CreateSessionDto[];
}