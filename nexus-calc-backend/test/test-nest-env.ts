import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({ isGlobal: true });
console.log('JWT_SECRET:', process.env.JWT_SECRET);
