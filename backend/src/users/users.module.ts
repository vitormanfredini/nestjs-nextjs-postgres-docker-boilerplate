import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/services/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UsersService, PrismaService, AuthService],
  exports: [UsersService],
  imports: []
})
export class UsersModule {}
