import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { UserDto } from '../../user/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post()
  login(@Body() payload: UserDto) {
    return this.userService.validateUser(payload);
  }
}
