/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class UrlDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string

  @IsString()
  @IsNotEmpty()
  readonly slug: string

  @IsString()
  @IsNotEmpty()
  readonly description: string

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number
}

export class UrlUpdateDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string
}

export class SlugDeleteDto {
  @IsString()
  @IsNotEmpty()
  readonly slug: string
}
