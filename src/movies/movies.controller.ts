import {Controller, Post, Get, Patch, Delete, Param, Body} from '@nestjs/common';
import {MoviesService} from './movies.service';
import {CreateMovieDto} from './dto/create-movie.dto';
import {Movie} from './entities/movie.entity';
import {ApiTags, ApiResponse, ApiOperation} from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {
    }

    @Post()
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
    @ApiOperation({summary: 'Update a movie'})
    @ApiResponse({status: 200, description: 'The updated movie.'})
    async update(@Param('id') id: number, @Body() updateMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.update(id, updateMovieDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a movie'})
    @ApiResponse({status: 204, description: 'The movie has been successfully deleted.'})
    async remove(@Param('id') id: number): Promise<void> {
        return this.moviesService.remove(id);
    }
}
