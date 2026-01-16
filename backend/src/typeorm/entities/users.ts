import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_act6' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}