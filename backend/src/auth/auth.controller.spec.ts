import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwtConfig';
import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/services/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register(jwtConfig),
      ],
      controllers: [AuthController],
      providers: [PrismaService, UsersService, AuthService, EmailService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create user with valid details', async () => {

    const result = await controller.create({
      username: 'john.doe',
      email: 'testingjohndoe@gmail.com',
      name: 'John Doe',
      password: '8u2ejdf082u3en02',
    });

    expect(result.success).toBe(true);
  });
});

