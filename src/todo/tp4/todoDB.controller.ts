import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Todo } from '../Model/todo.model';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { TodoEntity } from '../entity/todo.entity';

import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

import { SelectQueryBuilder } from 'typeorm';
import { TodoService } from './todoService';
import { SearchTodoDto } from './search-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';

@Controller({
  path: 'todo',
  version: '2',
})
export class TodoDBController {
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos(@Query() searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    return this.todoService.findAll(searchTodoDto);
  }
  //exercice 229
  @Get()
  getTodosQuery(@Query() searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    return this.todoService.findDesName(searchTodoDto);
  }

  @Post()
  addTodo(@Body() newTodoData: Partial<TodoEntity>): Promise<TodoEntity> {
    return this.todoService.addTodo(newTodoData);
  }
  @Patch(':id')
  updateTodo(
    @Body() updateTodoDto: UpdateTodoDto,
    @Param('id') id: string,
  ): Promise<TodoEntity> {
    return this.todoService.updateTodo(updateTodoDto, id);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<DeleteResult> {
    return this.todoService.deleteTodo(id);
  }
  @Delete('/soft/:id')
  softDeleteTodo(@Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.softDeleteTodo(id);
  }
  @Patch('/soft/:id')
  softRestoreTodo(@Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.softRestoreTodo(id);
  }
  @Get('version')
  version() {
    return '2';
  }

  //exercice 233
  @Get('/pagination/:limit/:offset')
  pagination(
    @Param('limit') limit: number,
    @Param('offset') offset: number,
  ): Promise<SelectQueryBuilder<TodoEntity>> {
    return this.todoService.pagination(limit, offset);
  }

  //exercice 236
  @Get()
  Stats(@Query() date1: Date, @Query() date2: Date): Promise<any> {
    return this.todoService.TodoStats(date1, date2);
  }
}
