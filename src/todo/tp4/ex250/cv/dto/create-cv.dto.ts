import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export const errors = {
  tailleMin: 'la taille est moins que le min ',
  tailleMax: 'la taille est plus que le max ',
  notEmpty: 'le champ  ne doit pas etre vide',
};
export class CreateCvDto {
  @IsNotEmpty({ message: errors.notEmpty })
  name: string;
  @IsNotEmpty({ message: errors.notEmpty })
  firstname: string;
  @IsNotEmpty({ message: errors.notEmpty })
  Age: number;
  @IsNotEmpty({ message: errors.notEmpty })
  @MinLength(8, { message: errors.tailleMin })
  @MaxLength(8, { message: errors.tailleMax })
  CIN: number;
  @IsNotEmpty({ message: errors.notEmpty })
  Job: string;
  @IsNotEmpty({ message: errors.notEmpty })
  path: string;
}
