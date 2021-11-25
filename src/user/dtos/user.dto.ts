import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly pin: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly floor: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly tower: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly wing: number;

  @IsString()
  @IsNotEmpty()
  readonly apartment: string;
}
