import { IsNotEmpty, IsEnum, IsMongoId, IsArray } from 'class-validator';
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
