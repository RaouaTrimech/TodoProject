import {
  Body,
  Injectable,
  NotFoundException,
  Param,
  Req,
} from '@nestjs/common';
import { Todo } from '../todo/Model/todo.model';
import { todoDTOUpdateDto } from '../todo/DTO/todo.DTO.updateDto';
import { Request } from 'express';
import { todoDTOAddDto } from '../todo/DTO/todo.DTO.Addto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TodoServiceService {
  getTodobyId(id, todos: Todo[]): Todo {
    const mofidied = todos.find((todo) => (todo.id = id));
    if (mofidied) {
      return todos.find((todo) => todo.id == id);
    } else {
      throw new NotFoundException('Error');
    }
  }

  SuppTodobyId(id, todos: Todo[]): Todo[] {
    const mofidied = todos.find((todo) => (todo.id = id));
    if (mofidied) {
      todos = todos.filter((todo) => todo.id != id);
      return todos;
    } else {
      throw new NotFoundException('Error');
    }
  }

  ModifTodo(modifiTodo: Todo, todos: Todo[]): Todo[] {
    let modified = todos.find((todo) => (todo.id = modifiTodo.id));
    if (modified) {
      modified = { ...modified, ...modifiTodo };
      todos = todos.filter((todo) => todo.id != modifiTodo.id);
      todos.push(modified);
    } else {
      throw new NotFoundException('Error');
    }
    return todos;
  }

  ModifTodoPatch(modifTodo: todoDTOUpdateDto, todos: Todo[]): Todo[] {
    const modified = todos.find((todo) => (todo.id = modifTodo.id));

    if (modified) {
      modified.name = modifTodo.name ?? modified.name;
      modified.status = modifTodo.status ?? modified.status;
      modified.description = modifTodo.description ?? modified.description;
      todos = todos.filter((todo) => todo.id != modifTodo.id);
      todos.push(modified);
    } else {
      throw new NotFoundException('not found ');
    }
    return todos;
  }

  addTodo(newTodo: todoDTOAddDto, todos: Todo[]): Todo {
    let todo = new Todo();
    todo.id = uuidv4();
    todo = { ...todo, ...newTodo };
    todos.push(todo);
    return todo;
  }
}
