import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Session } from '../movies/entities/session.entity';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private ticketsRepository: Repository<Ticket>,
        @InjectRepository(Session)
        private sessionsRepository: Repository<Session>,
    ) {}

    async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
        const session = await this.sessionsRepository.findOne({where: {id: createTicketDto.sessionId}});
        if (!session) {
            throw new Error('Session not found');
        }

        const ticket = this.ticketsRepository.create({
            ...createTicketDto,
            session,
        });

        return this.ticketsRepository.save(ticket);
    }
}