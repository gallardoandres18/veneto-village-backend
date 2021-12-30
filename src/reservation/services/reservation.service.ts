import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateReservationDTO,
  FilterReservationDTO,
} from '../dtos/reservation.dto';
import { Reservation } from '../entities/reservation.entity';
import {
  findDuplicate,
  getDateNowString,
  NUMBER_OF_STADIUM,
} from '../../utils';
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
        hours: { $in: reservation.hours.slice(1, -1) },
        enabled: true,
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
    const startedAndFinishedHours = [];

    const reservatedDocuments = await this.reservationModel
      .find({
        enabled: true,
        type: typeOfStadium,
        date: getDateNowString(),
      })
      .exec();

    reservatedDocuments.forEach((reservatedDocument) => {
      const [firstHour, lastHour, middleHours] =
        this.processHours(reservatedDocument);

      startedAndFinishedHours.push(firstHour, lastHour);
      reservatedHours.push(...middleHours);
    });

    reservatedHours.push(...findDuplicate(startedAndFinishedHours));

    if (startedAndFinishedHours.find((hour) => hour === '08:00')) {
      reservatedHours.push('08:00');
    }

    if (startedAndFinishedHours.find((hour) => hour === '00:00')) {
      reservatedHours.push('00:00');
    }

    return reservatedHours;
  }

  private processHours(reservatedDocument) {
    const firstHour = reservatedDocument.hours.shift();
    const lastHour = reservatedDocument.hours.pop();

    return [firstHour, lastHour, reservatedDocument.hours];
  }

  async getAll() {
    return await this.reservationModel
      .find()
      .populate('user')
      .sort({ created: 'desc' })
      .exec();
  }

  async getByType(filters: FilterReservationDTO) {
    const { type, limit } = filters;
    const startDate = new Date().setHours(0, 0, 0, 0);
    const endDate = new Date().setHours(23, 59, 59, 999);
    const typeRegexp = new RegExp('^' + type);

    const reservations = await this.reservationModel
      .find({
        type: typeRegexp,
        startDate: {
          $gte: startDate as any,
          $lte: endDate as any,
        },
        enabled: true,
      })
      .populate('user')
      .sort({ startDate: 'asc' })
      .limit(+limit);

    return reservations.map((reservation) => ({
      user: reservation.user,
      number: NUMBER_OF_STADIUM[reservation.type],
      hour: `${reservation.hours[0]} a ${
        reservation.hours[reservation.hours.length - 1]
      } hs`,
    }));
  }

  async getByUser(user: string) {
    return await this.reservationModel
      .find({
        user,
        enabled: true,
        created: {
          $gte: new Date((new Date() as any) - 7 * 60 * 60 * 24 * 1000),
        },
      })
      .exec();
  }

  async cancel(reservationId: string) {
    if (!Boolean(await this.reservationModel.findById(reservationId).count())) {
      throw new BadRequestException('Reserva no existe');
    }

    return await this.reservationModel.findByIdAndUpdate(
      reservationId,
      {
        $set: { enabled: false },
      },
      {
        new: true,
      },
    );
  }

  async clearAll() {
    await this.reservationModel.deleteMany();
  }
}
