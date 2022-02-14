import { PartialType } from '@nestjs/mapped-types';
import { Todo } from '../Model/todo.model';
import { todoDTOAddDto } from './todo.DTO.Addto';
import { TodoStatusEnum } from '../enums/todo-status.enum';

export class todoDTOUpdateDto extends PartialType(todoDTOAddDto) {
  id;
  status: TodoStatusEnum;
}
