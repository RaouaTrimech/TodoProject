import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { TodoStatusEnum } from '../enums/todo-status.enum';
import { todoDTOAddDto } from '../DTO/todo.DTO.Addto';

export class UpdateTodoDto extends PartialType(todoDTOAddDto) {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
