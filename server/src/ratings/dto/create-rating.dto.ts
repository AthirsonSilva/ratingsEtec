import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsString()
  @IsNotEmpty()
  readonly subject: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @IsString()
  @IsNotEmpty()
  readonly teacher: string;

  @IsString()
  @IsNotEmpty()
  readonly student: string;

  @IsString()
  @IsNotEmpty()
  readonly positiveMessage: string;

  @IsString()
  @IsNotEmpty()
  readonly negativeMessage: string;
}
