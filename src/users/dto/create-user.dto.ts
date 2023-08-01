import { IsEmail, IsString, IsNumber } from 'class-validator';
import { Address } from '../entities/address.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  address: Address;
}
