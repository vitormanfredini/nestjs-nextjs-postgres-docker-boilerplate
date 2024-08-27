import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService
  ) {}

  async generateAccessToken(user: User){
    
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      name: user.name
    };

    return await this.jwtService.signAsync(payload);

  }

  async hashPassword(password: string): Promise<string> {

    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);

  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    
    return await bcrypt.compare(password, storedHash);

  }

}
