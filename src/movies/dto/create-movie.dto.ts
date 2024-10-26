import {IsInt, IsNotEmpty, IsString, IsArray} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {CreateSessionDto} from './create-session.dto';

export class CreateMovieDto {
    @ApiProperty({description: 'Name of the movie'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'Age restriction of the movie'})
    @IsInt()
    @IsNotEmpty()
    ageRestriction: number;

    @ApiProperty({description: 'Sessions associated with the movie', type: [CreateSessionDto]})
    @IsArray()
    sessions: CreateSessionDto[];
}