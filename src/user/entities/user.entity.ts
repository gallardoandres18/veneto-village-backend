import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, type: Number })
  pin: number;

  @Prop({ required: true, type: Number })
  floor: number;

  @Prop({ required: true, type: Number })
  tower: number;

  @Prop({ required: true, type: Number })
  wing: number;

  @Prop({ required: true })
  apartment: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
