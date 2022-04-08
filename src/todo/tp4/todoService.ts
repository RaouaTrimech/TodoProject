import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Brackets,
  IsNull,
  Like,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { TodoEntity } from '../entity/todo.entity';
import { UpdateTodoDto } from './update-todo.dto';
import { SearchTodoDto } from "./search-todo.dto";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  addTodo(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    return this.todoRepository.save(todo);
  }

  async updateTodo(
    updateTodoDto: UpdateTodoDto,
    id: string,
  ): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.preload({ id, ...updateTodoDto });
    if (newTodo) {
      return this.todoRepository.save(newTodo);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
    }
  }

  async deleteTodo(id: string): Promise<DeleteResult> {
    const result = await this.todoRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  async softDeleteTodo(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  async softRestoreTodo(id: string) {
    const result = await this.todoRepository.restore(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  findAll(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const criterias = [];
    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }
    if (searchTodoDto.criteria) {
      criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
      criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
    }
    if (criterias.length) {
      return this.todoRepository.find({ withDeleted: true, where: criterias });
    }
    return this.todoRepository.find({ withDeleted: true });
  }
  //exercice 229
  async findDesName(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const qb = await this.todoRepository.createQueryBuilder('todo');
    return await qb
      .where('todo.status = :status', {
        status: searchTodoDto.status,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('todo.name Like ( `% :name %`)', {
            name: searchTodoDto.criteria,
          }).orWhere('todo.description Like ( `% :description %`)', {
            description: searchTodoDto.criteria,
          });
        }),
      )
      .getRawMany();
  }

  //exercice 233
  async pagination(
    limit: number,
    offset: number,
  ): Promise<SelectQueryBuilder<TodoEntity>> {
    const qb = await this.todoRepository.createQueryBuilder('todo');
    return qb
      .select(['todo.id', 'todo.name', 'todo.description'])
      .take(limit)
      .skip(offset);
  }

  //exercice 236
  async TodoStats(date1: Date, date2: Date): Promise<any> {
    const qb = await this.todoRepository.createQueryBuilder('todo');
    if (!date1 || !date2) {
      return qb
        .select(['todo.status , count(todo.id) as nbr'])
        .groupBy('status')
        .getRawMany();
    } else {
      return qb
        .select(['todo.status , count(todo.id) as nbr'])
        .where('todo.createdAt > :date1 ', {
          date1: date1,
        })
        .andWhere('todo.createdAt < :date2 ', {
          date2: date2,
        })
        .groupBy('status')
        .getRawMany();
    }
  }
}
