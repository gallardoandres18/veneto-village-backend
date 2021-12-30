import {
  Body,
  Controller,
  PayloadTooLargeException,
  Post,
} from '@nestjs/common';
import { IUser } from '../../types';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() payload: UserDto) {
    const users = [];
    users.push(payload);
    return this.userService.createUsers(users as IUser[]);
  }

  @Post('initial-data')
  createInitialData() {
    this.userService.createUsers();
  }

  @Post('update-pins')
  updatePins() {
    this.userService.updatePins();
  }
}
