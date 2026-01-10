import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'longtext' })
  poster: string;

  @OneToMany(() => Review, (review) => review.movie, { cascade: true, eager: true })
  reviews: Review[];
}
