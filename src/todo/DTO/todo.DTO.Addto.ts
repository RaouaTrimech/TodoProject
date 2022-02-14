import { PartialType } from '@nestjs/mapped-types';
import { Todo } from '../Model/todo.model';

export class todoDTOAddDto {
  name: string;
  description: string;
}
