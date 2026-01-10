import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  poster: string;

  @IsArray()
  @IsOptional()
  reviews?: any[];
}