import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'admin_act6' })
export class Admin {
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

  @Column({ default: 'admin' })
  role: string;
}
