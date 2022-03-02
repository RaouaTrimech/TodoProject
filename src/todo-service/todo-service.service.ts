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
  todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodobyId(id /*, todos: Todo[]*/): Todo {
    /*console.log('before');
    const mofidied = this.todos.find((todo) => todo.id == id);
    console.log('after');
    if (mofidied) {
      return this.todos.find((todo) => todo.id == id);
    } else {
      throw new NotFoundException('Error');
    }*/
    console.log('Get Todo By Id');
    //recherche du Todo par ID
    const todo = this.todos.find((actualTodo) => actualTodo.id === id);
    console.log(todo);
    if (todo) return todo;
    throw new NotFoundException(`le todo d'id ${id} n'existe pas `);
  }

  SuppTodobyId(id /*, todos: Todo[]*/): Todo[] {
    /*const mofidied = this.todos.find((todo) => todo.id === id);
    if (mofidied) {
      this.todos = this.todos.filter((todo) => todo.id != id);
      return this.todos;
    } else {
      throw new NotFoundException('Error');
    }*/
    //Chercher l'objet via son id dans le tableau des todos
    const index = this.todos.findIndex((actualtodo) => actualtodo.id === id);
    console.log(index);
    //Utiliser la methode slice pour supprimer le todo s'il existe
    if (index >= 0) {
      this.todos = this.todos.splice(index, 1);
    } else {
      //sinon declacher une erreur
      throw new NotFoundException("le todo n'existe pas ");
    }
    console.log('Supprimer un todo');
    return this.todos;
  }

  ModifTodo(modifiTodo: Todo /*, todos: Todo[]*/): Todo[] {
    const todo = this.todos.find((todo) => (todo.id = modifiTodo.id));
    /*if (modified) {
      modified = { ...modified, ...modifiTodo };
      this.todos = this.todos.filter((todo) => todo.id != modifiTodo.id);
      this.todos.push(modified);
    } else {
      throw new NotFoundException('Error');
    }*/
    todo.name = modifiTodo.name;
    todo.description = modifiTodo.description;
    todo.status = modifiTodo.status;
    return this.todos;
  }

  ModifTodoPatch(modifTodo: todoDTOUpdateDto /*, todos: Todo[]*/): Todo[] {
    const modified = this.todos.find((todo) => (todo.id = modifTodo.id));

    if (modified) {
      modified.name = modifTodo.name ?? modified.name;
      modified.status = modifTodo.status ?? modified.status;
      modified.description = modifTodo.description ?? modified.description;
      /*todos = todos.filter((todo) => todo.id != modifTodo.id);
      todos.push(modified);*/
    } else {
      throw new NotFoundException('not found ');
    }
    return this.todos;
  }

  addTodo(newTodo: todoDTOAddDto /*, todos: Todo[]*/): Todo {
    let todo = new Todo();
    todo.id = uuidv4();
    //console.log(todo.name);
    todo = { ...todo, ...newTodo };
    this.todos.push(todo);
    return todo;
  }
}
