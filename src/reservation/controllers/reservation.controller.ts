import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TypesOfStadiums } from 'src/types';
import {
  CreateReservationDTO,
  FilterReservationDTO,
} from '../dtos/reservation.dto';
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

  @Get('by-type')
  getByType(@Query() filters: FilterReservationDTO) {
    return this.reservationService.getByType(filters);
  }

  @Get()
  getReservations() {
    return this.reservationService.getAll();
  }
}
