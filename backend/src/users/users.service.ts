import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { z } from 'zod';
import { CreateUserDto, LoginDto } from './dto';
import { CreationResponse } from 'src/types/CreationResponse';
import { ValidationResponse } from 'src/types/ValidationResponse';
import { AuthService } from 'src/auth/auth.service';
import { JwtResponse, SanitizedUser } from './types';

const newUserSchema = z.object({
  name: z.string({
    errorMap: () => ({ message: 'Name must be between 3 and 32 characters.' })
  }).min(3).max(64),
  username: z.string({
    errorMap: () => ({ message: 'Username must be between 3 and 32 characters.' })
  }).min(3).max(32),
  password: z.string({
    errorMap: () => ({ message: 'Password must be between 8 and 32 characters.' })
  }).min(8).max(32),
  email: z.string({
    errorMap: () => ({ message: 'Enter a valid email address.' })
  }).email()
});

const loginSchema = z.object({
  identifier: z.string({
    errorMap: () => ({ message: 'Enter your email or username.' })
  }).min(3).max(64),
  password: z.string({
    errorMap: () => ({ message: 'Enter your password.' })
  }).min(8).max(32)
});

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);
  private readonly prismaService: PrismaService;
  private readonly authService: AuthService;

  constructor(private readonly _prismaService: PrismaService, private readonly _authService: AuthService) {
    this.prismaService = _prismaService;
    this.authService = _authService;
  }

  async getUsers(): Promise<any[]> {
    try {
      return await this.prismaService.findMany<User>('user',{});
    } catch (error) {
      this.logger.error('Failed to get users', (error as Error).stack);
      throw new Error('Failed to get users');
    }
  }

  async create(userDto: CreateUserDto): Promise<CreationResponse<User>> {

    try {
      const user: User = await this.prismaService.findFirst<User>('user',{
        where: {
          OR: [
            { email: userDto.email },
            { username: userDto.username },
          ],
        },
      });
      if(user !== null){
        const messages: string[] = [];
        if(userDto.email == user.email){
          messages.push('This email is already taken.');
        }
        if(userDto.username == user.username){
          messages.push('This username is already taken.');
        }
        return {
          success: false,
          errors: messages
        }
      }
    } catch (error) {
      return {
        success: false,
        errors: [(error as Error).message]
      }
    }

    try {

      userDto.password = await this.authService.hashPassword(userDto.password);

      const user = await this.prismaService.create<User>('user',{
        data: userDto,
      });
      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        errors: [(error as Error).message]
      }
    }

  }

  async login(loginDto: LoginDto): Promise<CreationResponse<JwtResponse>> {

    try {

      const user: User = await this.prismaService.findFirst<User>('user',{
        where: {
          OR: [
            { email: loginDto.identifier },
            { username: loginDto.identifier },
          ],
        },
      });

      if(user === null){
        return {
          success: false,
          errors: ['Incorrect email/username or password.']
        }
      }

      if(false === await this.authService.verifyPassword(loginDto.password,user.password)){
        return {
          success: false,
          errors: ['Incorrect email/username or password.']
        }
      }

      return {
        success: true,
        data: {
          jwt: await this.authService.generateAccessToken(user)
        }
      };

    } catch (error) {
      return {
        success: false,
        errors: [(error as Error).message]
      }
    }

  }

  validateNewUser(user: CreateUserDto): ValidationResponse<CreateUserDto> {

    const validatedFields = newUserSchema.safeParse(user);

    if(!validatedFields.success){
      return {
        success: false,
        errors: validatedFields.error.errors.map(error => error.message)
      }
    }

    return {
      success: true,
      validData: validatedFields.data
    }
  }

  validateLogin(user: LoginDto): ValidationResponse<LoginDto> {

    const validatedFields = loginSchema.safeParse(user);

    if(!validatedFields.success){
      return {
        success: false,
        errors: validatedFields.error.errors.map(error => error.message)
      }
    }

    return {
      success: true,
      validData: validatedFields.data
    }
  }

  sanitizeUser(user: User): SanitizedUser {

    return {
      name: user.name,
      username: user.username,
      email: user.email
    };
    
  }
  
}
