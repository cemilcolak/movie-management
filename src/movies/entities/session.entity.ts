import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { Movie } from './movie.entity';
import {TimeSlot} from "../dto/create-session.dto";
import {Ticket} from "../../tickets/entities/ticket.entity";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date; // Change to Date for consistency

    @Column()
    timeSlot: TimeSlot; // Change to TimeSlot enum type

    @Column()
    roomNumber: number; // Change to number for consistency

    @ManyToOne(() => Movie, movie => movie.sessions)
    movie: Movie;

    @OneToMany(() => Ticket, ticket => ticket.session)
    tickets: Ticket[];
}