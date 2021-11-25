import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MongoIdPipe } from 'src/shared/mongo-id.pipe';
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

  @Post('cancel/:reservationId')
  cancel(@Param('reservationId', MongoIdPipe) reservationId: string) {
    return this.reservationService.cancel(reservationId);
  }

  @Get('reservated-hours')
  getReservatedHours(@Query('type') type: TypesOfStadiums) {
    return this.reservationService.getReservatedHours(type);
  }

  @Get('by-type')
  getByType(@Query() filters: FilterReservationDTO) {
    return this.reservationService.getByType(filters);
  }

  @Get('by-user')
  getByuser(@Query('user') user: string) {
    return this.reservationService.getByUser(user);
  }

  @Get()
  getReservations() {
    return this.reservationService.getAll();
  }
}
