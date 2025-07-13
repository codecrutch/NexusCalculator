import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column({ nullable: true })
  subpath: string;

  @Column()
  name: string;

  @Column('int')
  vita: number;

  @Column('int')
  mana: number;

  @Column('int')
  might: number;

  @Column('int')
  will: number;

  @Column('int')
  grace: number;

  @Column()
  alignment: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  clan: string;

  @Column({ nullable: true })
  clantitle: string;

  @Column({ nullable: true })
  imagelocation: string;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
