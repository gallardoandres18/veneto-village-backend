import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../types';
import { userInitialData } from '../data';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUsers(users = userInitialData) {
    await this.userModel.bulkWrite(
      users.map((user) => {
        const { apartment, floor, tower, pin, wing, name } = user;
        return {
          updateOne: {
            filter: { tower, apartment, floor, pin, wing, name },
            update: user,
            upsert: true,
          },
        };
      }),
    );
  }

  async updatePins() {
    await this.userModel.updateMany({}, { $set: { pin: 1234 } });
  }

  async validateUser(payload: UserDto) {
    const { pin, tower, floor, apartment, wing } = payload;

    const user = await this.userModel
      .find({
        pin,
        tower,
        floor,
        apartment,
        wing,
      })
      .exec();

    if (user.length === 0) {
      throw new NotFoundException('User doesnt exist');
    }

    return user[0];
  }
}
