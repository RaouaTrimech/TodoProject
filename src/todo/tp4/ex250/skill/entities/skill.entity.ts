import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';

@Entity('skill')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({})
  Designation: string;
  @ManyToMany(() => Cv)
  @JoinTable()
  Cvs: Cv[];
}
