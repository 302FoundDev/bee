import {  IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly full_name: string

  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly full_name: string

  @IsEmail()
  @IsOptional()
  readonly email: string

  @IsString()
  @IsOptional()
  readonly password: string
}

export class ExistingUsersDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string
}

export class GetUserDataDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly password: string

  @IsString()
  @IsNotEmpty()
  readonly full_name: string

  @IsNumber()
  @IsNotEmpty()
  readonly created_at: number
}
