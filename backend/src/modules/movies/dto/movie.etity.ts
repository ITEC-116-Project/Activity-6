import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  poster: string; // Base64 string or URL

  @Column('jsonb', { default: [] })
  reviews: Review[];
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
}