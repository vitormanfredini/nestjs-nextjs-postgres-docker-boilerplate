import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export type genericPrismaDto = {
  data: any
};

@Injectable()
export class PrismaService {
  private readonly logger = new Logger(PrismaService.name);
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.connectToDb();
  }

  async connectToDb() {
    try {
      await this.prisma.$connect();
      this.logger.log('Successfully connected to the database');
    } catch (error) {
      if(error instanceof Error){
        this.logger.error('Failed to connect to the database:', error.stack);
      }else{
        this.logger.error('Failed to connect to the database. Unknown error:', error);
      }
      
      throw error;
    }
  }

  async findMany<T>(model: string, params?: any): Promise<T[]> {
    try {
      const delegate = this.prisma[model as keyof PrismaClient];
      if ('findMany' in delegate) {
        return await delegate.findMany(params) as T[];
      } else {
        throw new Error(`${model} is not a valid Prisma model with a findMany method`);
      }
    } catch (error) {
      this.logger.error(`Failed to retrieve list from ${model}`, (error as Error).stack);
      throw error;
    }
  }

  async findFirst<T>(model: string, params?: any): Promise<T> {
    try {
      const delegate = this.prisma[model as keyof PrismaClient];
      if ('findMany' in delegate) {
        return await delegate.findFirst(params) as T;
      } else {
        throw new Error(`${model} is not a valid Prisma model with a findFirst method`);
      }
    } catch (error) {
      this.logger.error(`Failed to retrieve item from ${model}`, (error as Error).stack);
      throw error;
    }
  }

  async create<T>(model: string, dto: genericPrismaDto): Promise<T> {
    try {
      const delegate = this.prisma[model as keyof PrismaClient];
      if ('create' in delegate) {
        return await delegate.create(dto) as T;
      } else {
        throw new Error(`${model} is not a valid Prisma model with a create method`);
      }
    } catch (error) {
      this.logger.error(`Failed to retrieve list from ${model}`, (error as Error).stack);
      throw error;
    }
  }

  // // Example method to create a user
  // async createUser(data: { username: string; password: string }) {
  //   return this.prisma.user.create({
  //     data,
  //   });
  // }
}