import { Body, Controller, Get, Header, Post, UseGuards, Request } from '@nestjs/common';
import { ApiResponse } from 'src/types/ApiResponse';
import { CreateUserDto, LoginDto } from 'src/users/dto';
import { JwtResponse, SanitizedUser } from 'src/users/types';
import { UsersService } from 'src/users/users.service';
import { errorResponse, successResponse } from 'src/utils/ApiResponse';
import { AuthGuard } from './auth.guard'
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {

  constructor(
    private usersService: UsersService,
    private readonly emailService: EmailService
  ) {}

  @Post('new')
  @Header('Cache-Control', 'none')
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<SanitizedUser>> {
    
    const validateResponse = this.usersService.validateNewUser(createUserDto);
    if(!validateResponse.success){
      return errorResponse(validateResponse.errors);
    }

    const createResponse = await this.usersService.create(validateResponse.validData);
    if(!createResponse.success){
      return errorResponse(createResponse.errors);
    }

    await this.emailService.send({
      template: 'newuser',
      data: {
        email: createResponse.data.email,
        name: createResponse.data.name,
        subject: "Your account has been created succesfully",
        message: `Hi ${createResponse.data.name}, your account has been created succesfully.\nYou can now use your credentials to login.`,
        username: createResponse.data.username
      }
    });
    
    const sanitizedUser = this.usersService.sanitizeUser(createResponse.data);
    return successResponse(sanitizedUser);
  }

  @Post('login')
  @Header('Cache-Control', 'none')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse<JwtResponse>> {
    
    const validateResponse = this.usersService.validateLogin(loginDto);
    if(!validateResponse.success){
      return errorResponse(validateResponse.errors);
    }

    const loginResponse = await this.usersService.login(validateResponse.validData);
    if(!loginResponse.success){
      return errorResponse(loginResponse.errors);
    }

    return successResponse({
      jwt: loginResponse.data.jwt,
      username: loginResponse.data.username,
      name: loginResponse.data.name,
      email: loginResponse.data.email,
    });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req): ApiResponse<SanitizedUser> {
    const sanitizedUser = this.usersService.sanitizeUser(req.user);
    return successResponse(sanitizedUser);
  }

}
