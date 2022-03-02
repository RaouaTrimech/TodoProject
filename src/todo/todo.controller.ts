import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Todo } from './Model/todo.model';
import { Request } from 'express';
import { todoDTOUpdateDto } from './DTO/todo.DTO.updateDto';
import { todoDTOAddDto } from './DTO/todo.DTO.Addto';
import { TodoServiceService } from '../todo-service/todo-service.service';
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoServiceService) {
    // this.todos = [new Todo('1', 'Sport', 'Faire du sport')];
  }
  //todos: Todo[] = [];

  //récuperer un todo via son id
  @Get('/:id')
  getTodobyId(@Param('id') id): Todo {
    return this.todoService.getTodobyId(id /*, this.todos*/);
  }

  //supprimer un todo via son id
  @Delete('/:id')
  SuppTodobyId(@Param('id') id): Todo[] {
    return this.todoService.SuppTodobyId(id /*, this.todos*/);
  }

  //modifier un todo

  @Post()
  ModifTodo(@Body() modifTodo: Todo): Todo[] {
    return this.todoService.ModifTodo(modifTodo /*, this.todos*/);
  }

  @Patch()
  ModifTodoPatch(@Body() modifTodo: todoDTOUpdateDto): Todo[] {
    return this.todoService.ModifTodoPatch(modifTodo /*, this.todos*/);
  }

  @Get()
  getTodos(@Req() request: Request): Todo[] {
    // console.log(request);
    //return this.todos;
    return this.todoService.getTodos();
  }
  @Post('add')
  addTodo(@Body() newTodo: todoDTOAddDto): Todo {
    return this.todoService.addTodo(newTodo /*, this.todos*/);
  }
}
