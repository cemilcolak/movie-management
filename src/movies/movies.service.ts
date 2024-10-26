import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Session } from "./entities/session.entity";
import { CreateSessionDto } from "./dto/create-session.dto";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: Repository<Movie>,
        @InjectRepository(Session)
        private sessionsRepository: Repository<Session>,
    ) {}

    async create(createMovieDto: CreateMovieDto): Promise<Movie> {
        const movie = this.moviesRepository.create(createMovieDto);
        return this.moviesRepository.save(movie);
    }

    async findAll(): Promise<Movie[]> {
        return this.moviesRepository.find({ relations: ['sessions'] });
    }

    async findOne(id: number): Promise<Movie> {
        const movie = await this.moviesRepository.findOne({ where: { id }, relations: ['sessions'] });
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
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

    async createSession(movieId: number, createSessionDto: CreateSessionDto): Promise<Session> {
        const movie = await this.moviesRepository.findOne({where: { id: movieId }}); // Use id for the where clause
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${movieId} not found`);
        }

        const session = this.sessionsRepository.create({ ...createSessionDto, movie }); // Ensure movie reference is correct
        return this.sessionsRepository.save(session);
    }

    async getSessions(movieId: number): Promise<Session[]> {
        const movie = await this.moviesRepository.findOne({ where: { id: movieId }, relations: ['sessions'] }); // Use id for the where clause
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${movieId} not found`);
        }
        return movie.sessions;
    }

    async deleteSession(sessionId: number): Promise<void> {
        const result = await this.sessionsRepository.delete(sessionId);
        if (result.affected === 0) {
            throw new NotFoundException(`Session with ID ${sessionId} not found`);
        }
    }
}
