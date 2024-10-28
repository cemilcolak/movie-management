import {Entity, PrimaryGeneratedColumn, ManyToOne, Column} from 'typeorm';
import {Session} from '../../movies/entities/session.entity'; // Adjust the path as needed

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Session, session => session.tickets)
    session: Session;

    @Column()
    customerName: string; // Store customer's name or other identifier

    @Column()
    email: string; // Store customer's email for ticket confirmation
}