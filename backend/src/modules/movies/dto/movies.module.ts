import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import { Movie } from '../entities/movie.entity';
import { Review } from '../entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Review])],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}