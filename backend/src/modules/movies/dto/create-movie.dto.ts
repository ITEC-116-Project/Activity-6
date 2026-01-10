import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    description: 'The title of the movie',
    example: 'The Shawshank Redemption',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The poster URL of the movie',
    example: 'https://example.com/poster.jpg',
  })
  @IsString()
  @IsNotEmpty()
  poster: string;
}

