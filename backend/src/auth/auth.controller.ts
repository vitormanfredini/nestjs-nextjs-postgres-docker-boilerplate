import { Body, Controller, Header, Post } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { ApiResponse } from 'src/types/ApiResponse';
import { CreateUserDto, LoginDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { errorResponse, successResponse } from 'src/utils/ApiResponse';

@Controller('auth')
export class AuthController {

  constructor(
    private usersService: UsersService
  ) {}

  @Post('new')
  @Header('Cache-Control', 'none')
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse> {
    
    const validateResponse = this.usersService.validateNewUser(createUserDto);
    if(!validateResponse.success){
      return errorResponse(validateResponse.errors);
    }

    const createResponse = await this.usersService.create(validateResponse.validData);
    if(!createResponse.success){
      return errorResponse(createResponse.errors);
    }

    return successResponse(createResponse.data);
  }

  @Post('login')
  @Header('Cache-Control', 'none')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse> {
    
    const validateResponse = this.usersService.validateLogin(loginDto);
    if(!validateResponse.success){
      return errorResponse(validateResponse.errors);
    }

    const loginResponse = await this.usersService.login(validateResponse.validData);
    if(!loginResponse.success){
      return errorResponse(loginResponse.errors);
    }

    return successResponse({
      jwt: loginResponse.data.jwt
    });
  }

}
