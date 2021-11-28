import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './Dto/create.dto';
import { UpdateDto } from './Dto/update.dto';
import { Entity } from './entities/entityname.entity';

//make new controller: nest g co
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(): Entity[] {
    return this.appService.getAll();
  }

  //request with query
  @Get('search')
  search(@Query('key') value: string) {
    return `Searching entity with value: ${value}`;
  }

  //request with params. Must be put below query route
  @Get(':id')
  getOne(@Param('id') id: string): Entity {
    return this.appService.getOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.delete(id);
  }

  //request with JSON body
  @Post()
  create(@Body() payload: CreateDto) {
    return this.appService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateDto) {
    return this.appService.update(id, updateData);
  }
}
