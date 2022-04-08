import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({})
  username: string;
  @Column({})
  password: string;
  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];
}
