import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Movie} from './entities/movie.entity';
import {CreateMovieDto} from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: Repository<Movie>,
    ) {
    }

    async create(createMovieDto: CreateMovieDto): Promise<Movie> {
        const movie = this.moviesRepository.create(createMovieDto);
        return this.moviesRepository.save(movie);
    }

    async findAll(): Promise<Movie[]> {
        return this.moviesRepository.find({relations: ['sessions']});
    }

    async findOne(id: number): Promise<Movie> {

        const movie = await this.moviesRepository.findOne({where: { id }, relations: ['sessions']});
        if (!movie) {
            throw new Error('Movie not found');
        }
        return movie;
    }

    async update(id: number, updateMovieDto: CreateMovieDto): Promise<Movie> {
        await this.findOne(id); // Ensure movie exists
        await this.moviesRepository.update(id, updateMovieDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.moviesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
    }
}
