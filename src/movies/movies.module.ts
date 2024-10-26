import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MoviesController} from './movies.controller';
import {MoviesService} from './movies.service';
import {Movie} from './entities/movie.entity';
import {Session} from './entities/session.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movie, Session])],
    controllers: [MoviesController],
    providers: [MoviesService],
})

export class MoviesModule {}
