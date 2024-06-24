import { Controller, Get } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly appService: DataService) {}

  @Get()
  getData(): Promise<any> {
    return this.appService.getData();
  }
}
