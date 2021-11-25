export enum TypesOfStadiums {
  'FOOTBALL',
  'PADDLE_A',
  'PADDLE_B',
  'TENNIS',
  'BOWLING_A',
  'BOWLING_B',
}

export interface IUser {
  name: string;
  identityNumber: number;
  wing: number;
  tower: number;
  apartment: string;
  floor: number;
  pin: number;
}
