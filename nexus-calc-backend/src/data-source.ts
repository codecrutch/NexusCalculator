import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Character } from './entities/character.entity';
import { Creature } from './entities/creature.entity';
import { Cave } from './entities/cave.entity';
import { PasswordResetToken } from './auth/entities/password-reset-token.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Character, Creature, Cave, PasswordResetToken],
  migrations: ['./migrations/*.ts'],
  synchronize: false,
});
