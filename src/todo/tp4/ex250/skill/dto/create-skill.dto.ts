import { IsNotEmpty } from 'class-validator';

export const errors = {
  notEmpty: 'le champ  ne doit pas etre vide',
};
export class CreateSkillDto {
  @IsNotEmpty({ message: errors.notEmpty })
  Designation: string;
}
