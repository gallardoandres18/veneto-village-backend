import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateReservationDTO,
  FilterReservationDTO,
} from '../dtos/reservation.dto';
import { Reservation } from '../entities/reservation.entity';
import { getDateNowString } from 'src/utils';
@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  async create(reservation: CreateReservationDTO) {
    const [hours, minutes] = reservation.hours[0].split(':');
    const startDate = new Date().setHours(+hours, +minutes, 0, 0);

    const existsReservation = await this.reservationModel
      .find({
        type: reservation.type as any,
        date: getDateNowString(),
        hours: { $in: reservation.hours },
      })
      .count();

    if (Boolean(existsReservation)) {
      throw new BadRequestException('Algunas de esas horas ya estna ocupadas');
    }

    const reservationDocument = {
      ...reservation,
      created: new Date(),
      startDate,
      date: getDateNowString(),
      enabled: true,
    };

    return await this.reservationModel.create(reservationDocument);
  }

  async getReservatedHours(typeOfStadium: any) {
    const reservatedHours = [];

    const reservatedDocuments = await this.reservationModel
      .find({
        enabled: true,
        type: typeOfStadium,
        date: getDateNowString(),
      })
      .exec();

    reservatedDocuments.forEach((reservatedDocument) => {
      reservatedHours.push(...reservatedDocument.hours);
    });

    return reservatedHours;
  }

  async getAll() {
    return await this.reservationModel
      .find()
      .populate('user')
      .sort({ date: 'desc' })
      .exec();
  }

  async getByType(filters: FilterReservationDTO) {
    const { type, limit } = filters;
    const startDate = new Date().setHours(0, 0, 0, 0);
    const endDate = new Date().setHours(23, 59, 59, 999);

    return await this.reservationModel
      .find({
        type: type as any,
        startDate: {
          $gte: startDate as any,
          $lte: endDate as any,
        },
      })
      .populate('user')
      .sort({ startDate: 'asc' })
      .limit(+limit);
  }
}
