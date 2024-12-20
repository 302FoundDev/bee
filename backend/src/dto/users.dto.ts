/* eslint-disable prettier/prettier */
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly first_name: string;

  @IsString()
  @IsOptional()
  readonly last_name: string;
}

export class ExistingUsersDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

export class GetUserDataDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly created_at: number;
}
