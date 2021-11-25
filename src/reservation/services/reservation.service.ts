import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';

import { CreateReservationDTO } from '../dtos/reservation.dto';
import { Reservation } from '../entities/reservation.entity';
import { TypesOfStadiums } from 'src/types';
@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  async create(reservation: CreateReservationDTO) {
    const reservationDocument = {
      ...reservation,
      created: new Date(),
      date: new Date()
        .toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
        .split(' ')[0],
      enabled: true,
    };

    await this.reservationModel.create(reservationDocument);
  }

  async getReservatedHours(typeOfStadium: any) {
    const reservatedHours = [];

    const reservatedDocuments = await this.reservationModel
      .find({
        enabled: true,
        type: typeOfStadium,
        date: new Date()
          .toLocaleString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires',
          })
          .split(' ')[0],
      })
      .exec();

    reservatedDocuments.forEach((reservatedDocument) => {
      reservatedHours.push(...reservatedDocument.hours);
    });

    return reservatedHours;
  }
}
