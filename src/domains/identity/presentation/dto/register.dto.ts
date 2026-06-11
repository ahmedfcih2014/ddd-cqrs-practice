import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterCustomerDto {
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(3)
  name: string;
}
