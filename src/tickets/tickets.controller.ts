import {Controller, Post, Body, UseGuards} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@ApiTags('tickets')
@ApiBearerAuth('accessToken')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post()
    async create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
        return this.ticketsService.create(createTicketDto);
    }
}