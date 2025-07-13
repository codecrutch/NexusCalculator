import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('users')
@Index(['name', 'discriminator'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  encrypted_password: string;

  @Column()
  name: string;

  @Column()
  discriminator: string; // e.g., '1234'

  @Column({ nullable: true })
  reset_password_token: string;

  @Column({ type: 'timestamp', nullable: true })
  reset_password_sent_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  remember_created_at: Date;

  @Column({ default: 0 })
  sign_in_count: number;

  @Column({ type: 'timestamp', nullable: true })
  current_sign_in_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_sign_in_at: Date;

  @Column({ nullable: true })
  current_sign_in_ip: string;

  @Column({ nullable: true })
  last_sign_in_ip: string;

  @Column({ nullable: true })
  confirmation_token: string;

  @Column({ type: 'timestamp', nullable: true })
  confirmed_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmation_sent_at: Date;

  @Column({ nullable: true })
  unconfirmed_email: string;

  @Column('simple-array', { default: '' })
  permissions: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @OneToMany(() => Character, character => character.user)
  // characters: Character[];
}
