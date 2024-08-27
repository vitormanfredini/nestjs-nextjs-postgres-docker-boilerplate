import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  serverIsRunning(): string {
    return `Server is running in ${process.env.NODE_ENV} mode.`;
  }

}
