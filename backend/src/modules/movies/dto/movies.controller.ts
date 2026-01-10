import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MoviesService } from '../movies.service';
import { CreateMovieDto } from './create-movie.dto';
import { CreateReviewDto } from './create-review.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAllMovies() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async getMovie(@Param('id', ParseIntPipe) id: number) {
    return await this.moviesService.findOne(id);
  }

  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.create(createMovieDto);
  }

  @Put(':id')
  async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateMovieDto>,
  ) {
    return await this.moviesService.update(id, updateData);
  }

  @Delete(':id')
  async deleteMovie(@Param('id', ParseIntPipe) id: number) {
    await this.moviesService.delete(id);
    return { message: 'Movie deleted successfully' };
  }

  @Post(':id/reviews')
  async addReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return await this.moviesService.addReview(id, createReviewDto);
  }

  @Get(':id/rating')
  async getAverageRating(@Param('id', ParseIntPipe) id: number) {
    const rating = await this.moviesService.calculateAverageRating(id);
    return { rating };
  }
}