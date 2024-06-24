import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('sentry/project/:name')
  onSentry(@Param('name') name: string, @Body() body: any) {
    console.log('body: ', body);
    console.log('name: ', name);

    return 'success';
  }
}
