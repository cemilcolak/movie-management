import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Movie} from './movie.entity';

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string; // Use an appropriate format (e.g., YYYY-MM-DD)

    @Column()
    timeSlot: string;

    @Column()
    roomNumber: string;

    @ManyToOne(() => Movie, movie => movie.sessions)
    movie: Movie;
}