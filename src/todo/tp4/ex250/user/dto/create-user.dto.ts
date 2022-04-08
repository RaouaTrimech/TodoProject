import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { errors } from '../../cv/dto/create-cv.dto';

export class CreateUserDto {
  @IsNotEmpty({ message: errors.notEmpty })
  username: string;
  @IsNotEmpty({ message: errors.notEmpty })
  email: string;
  @IsNotEmpty({ message: errors.notEmpty })
  password: number;
}
