import {
  IsNotEmpty,
  IsEnum,
  IsMongoId,
  IsArray,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { TypesOfStadiums } from 'src/types';

export class CreateReservationDTO {
  @IsEnum(TypesOfStadiums)
  @IsNotEmpty()
  readonly type: TypesOfStadiums;

  @IsMongoId()
  @IsNotEmpty()
  readonly user: string;

  @IsNotEmpty()
  @IsArray()
  readonly hours: string[];
}

export class FilterReservationDTO {
  @IsEnum(TypesOfStadiums)
  @IsNotEmpty()
  readonly type: TypesOfStadiums;

  @IsOptional()
  readonly limit: number;
}
