import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Creature } from './creature.entity';

@Entity('caves')
export class Cave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cavename: string;

  @Column({ nullable: true })
  requirements: string;

  @Column({ nullable: true })
  coordinates: string;

  @Column({ nullable: true })
  boss: string;

  @Column({ nullable: true })
  drops: string;

  @OneToMany(() => Creature, (creature) => creature.cave)
  creatures: Creature[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
