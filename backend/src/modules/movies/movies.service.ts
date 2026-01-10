import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { Review } from './entities/review.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find({
      relations: ['reviews'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create({
      title: createMovieDto.title,
      poster: createMovieDto.poster,
      reviews: [],
    });
    return await this.movieRepository.save(movie);
  }

  async update(id: number, updateData: Partial<CreateMovieDto>): Promise<Movie> {
    await this.findOne(id);
    await this.movieRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
  }

  async addReview(id: number, createReviewDto: CreateReviewDto): Promise<Movie> {
    const movie = await this.findOne(id);
    const review = this.reviewRepository.create({
      ...createReviewDto,
      movie,
    });
    await this.reviewRepository.save(review);
    return await this.findOne(id);
  }

  async calculateAverageRating(id: number): Promise<number> {
    const movie = await this.findOne(id);
    if (!movie.reviews || movie.reviews.length === 0) {
      return 0;
    }
    const totalRating = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((totalRating / movie.reviews.length).toFixed(1));
  }
}   