import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { Session } from '../movies/entities/session.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Ticket, Session])],
    controllers: [TicketsController],
    providers: [TicketsService],
})
export class TicketsModule {}