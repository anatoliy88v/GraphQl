import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as typeOrmConfig from '../ormconfig.js';
import { TypeOrmModule } from '@nestjs/typeorm';

require('dotenv').config();

console.log(typeOrmConfig);
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
