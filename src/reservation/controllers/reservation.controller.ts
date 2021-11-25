import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TypesOfStadiums } from 'src/types';
import { CreateReservationDTO } from '../dtos/reservation.dto';
import { ReservationService } from '../services/reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Post()
  create(@Body() payload: CreateReservationDTO) {
    return this.reservationService.create(payload);
  }

  @Get('reservated-hours')
  getReservatedHours(@Query('type') type: TypesOfStadiums) {
    return this.reservationService.getReservatedHours(type);
  }
}
