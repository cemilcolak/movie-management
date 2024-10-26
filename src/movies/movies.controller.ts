import {Controller, Post, Get, Patch, Delete, Param, Body, UseGuards} from '@nestjs/common';
import {MoviesService} from './movies.service';
import {CreateMovieDto} from './dto/create-movie.dto';
import {Movie} from './entities/movie.entity';
import {ApiTags, ApiResponse, ApiOperation} from '@nestjs/swagger';
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {UserRole} from "../user/entities/user.entity";
import {CreateSessionDto} from "./dto/create-session.dto";
import {Session} from "./entities/session.entity";

@ApiTags('movies')
@Controller('movies')
@UseGuards(RolesGuard) // Use the RolesGuard for this controller
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {
    }

    @Post()
    @Roles(UserRole.MANAGER) // Only managers can create movies
    @ApiOperation({summary: 'Create a new movie'})
    @ApiResponse({status: 201, description: 'The movie has been successfully created.'})
    async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.create(createMovieDto);
    }

    @Get()
    @ApiOperation({summary: 'Get all movies'})
    @ApiResponse({status: 200, description: 'List of all movies.'})
    async findAll(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get a movie by ID'})
    @ApiResponse({status: 200, description: 'The found movie.'})
    async findOne(@Param('id') id: number): Promise<Movie> {
        return this.moviesService.findOne(id);
    }

    @Patch(':id')
    @Roles(UserRole.MANAGER) // Only managers can update movies
    @ApiOperation({summary: 'Update a movie'})
    @ApiResponse({status: 200, description: 'The updated movie.'})
    async update(@Param('id') id: number, @Body() updateMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.update(id, updateMovieDto);
    }

    @Delete(':id')
    @Roles(UserRole.MANAGER) // Only managers can update movies
    @ApiOperation({summary: 'Delete a movie'})
    @ApiResponse({status: 204, description: 'The movie has been successfully deleted.'})
    async remove(@Param('id') id: number): Promise<void> {
        return this.moviesService.remove(id);
    }

    @Post(':id/sessions')
    @Roles(UserRole.MANAGER)
    @ApiOperation({summary: 'Create a new session for a movie'})
    @ApiResponse({status: 201, description: 'The session has been successfully created.', type: Session})
    @ApiResponse({status: 404, description: 'Movie not found.'})
    async createSession(
        @Param('id') movieId: number,
        @Body() createSessionDto: CreateSessionDto,
    ): Promise<Session> {
        return this.moviesService.createSession(movieId, createSessionDto);
    }

    @Get(':id/sessions')
    @ApiOperation({summary: 'Get all sessions for a movie'})
    @ApiResponse({status: 200, description: 'List of sessions for the movie.', type: [Session]})
    @ApiResponse({status: 404, description: 'Movie not found.'})
    async getSessions(@Param('id') movieId: number): Promise<Session[]> {
        return this.moviesService.getSessions(movieId);
    }

    @Delete('sessions/:sessionId')
    @Roles(UserRole.MANAGER)
    @ApiOperation({summary: 'Delete a session by ID'})
    @ApiResponse({status: 204, description: 'The session has been successfully deleted.'})
    @ApiResponse({status: 404, description: 'Session not found.'})
    async deleteSession(@Param('sessionId') sessionId: number): Promise<void> {
        return this.moviesService.deleteSession(sessionId);
    }
}
