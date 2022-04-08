import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import faker from "@faker-js/faker";

@Entity('CV')
export class Cv {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({})
  name: string ;
  @Column({})
  firstname: string;
  @Column({})
  Age: number;
  @Column({})
  CIN: number;
  @Column({})
  Job: string;
  @Column({})
  path: string;
  @ManyToOne(() => User, (user) => user.cvs)
  user: User;
}
