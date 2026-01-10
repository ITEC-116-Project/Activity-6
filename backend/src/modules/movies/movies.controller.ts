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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({
    status: 200,
    description: 'List of all movies',
    isArray: true,
  })
  async getAllMovies() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single movie by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Movie ID',
  })
  @ApiResponse({ status: 200, description: 'Movie details' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  async getMovie(@Param('id', ParseIntPipe) id: number) {
    return await this.moviesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({ status: 201, description: 'Movie created successfully' })
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.create(createMovieDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a movie' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Movie ID',
  })
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({ status: 200, description: 'Movie updated successfully' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateMovieDto>,
  ) {
    return await this.moviesService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Movie ID',
  })
  @ApiResponse({ status: 200, description: 'Movie deleted successfully' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  async deleteMovie(@Param('id', ParseIntPipe) id: number) {
    await this.moviesService.delete(id);
    return { message: 'Movie deleted successfully' };
  }

  @Post(':id/reviews')
  @ApiOperation({ summary: 'Add a review to a movie' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Movie ID',
  })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, description: 'Review added successfully' })
  async addReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return await this.moviesService.addReview(id, createReviewDto);
  }

  @Get(':id/rating')
  @ApiOperation({ summary: 'Get average rating for a movie' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Movie ID',
  })
  @ApiResponse({ status: 200, description: 'Average rating' })
  async getAverageRating(@Param('id', ParseIntPipe) id: number) {
    const rating = await this.moviesService.calculateAverageRating(id);
    return { rating };
  }
}

