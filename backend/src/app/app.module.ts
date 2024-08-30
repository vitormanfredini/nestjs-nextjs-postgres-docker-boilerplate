import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
