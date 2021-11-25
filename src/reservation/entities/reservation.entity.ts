import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TypesOfStadiums } from 'src/types';
import { User } from 'src/user/entities/user.entity';

@Schema()
export class Reservation extends Document {
  @Prop({ required: true, type: [String] })
  hours: string[];

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User | Types.ObjectId;

  @Prop({ required: true, type: Date })
  created: Date;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true, type: Boolean })
  enabled: boolean;

  @Prop({ required: true })
  type: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
