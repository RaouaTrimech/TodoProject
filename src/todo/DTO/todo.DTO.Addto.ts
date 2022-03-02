import { PartialType } from '@nestjs/mapped-types';
import { Todo } from '../Model/todo.model';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export const errors = {
  tailleMin: 'la taille est moins que le min ',
  tailleMax: 'la taille est plus que le max ',
  notEmpty: 'le champ  ne doit pas etre vide',
};
export class todoDTOAddDto {
  @MinLength(3, { message: errors.tailleMin })
  @MaxLength(10, { message: errors.tailleMax })
  @IsNotEmpty({ message: errors.notEmpty })
  name: string;
  @MinLength(10, { message: errors.tailleMin })
  @IsNotEmpty({ message: errors.notEmpty })
  description: string;
}
