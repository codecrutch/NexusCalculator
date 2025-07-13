import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Cave } from './cave.entity';

@Entity('creatures')
export class Creature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creaturename: string;

  @Column('int')
  vita: number;

  @Column('int')
  ac: number;

  @Column({ nullable: true })
  imagelocation: string;

  @ManyToOne(() => Cave, (cave) => cave.creatures)
  cave: Cave;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
