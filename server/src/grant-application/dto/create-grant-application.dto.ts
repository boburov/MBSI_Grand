import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

// Arizani qabul qilish DTO'si. Barcha maydonlar ixtiyoriy (frontda ham optional).
// Faqat to'ldirilgan maydonlar tekshiriladi.
export class CreateGrantApplicationDto {
  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  // Client string yuborishi mumkin ("18") — Number'ga aylantiramiz.
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(100)
  age?: number

  @IsOptional()
  @IsString()
  fatherName?: string

  @IsOptional()
  @IsString()
  motherName?: string

  @IsOptional()
  @IsString()
  socialRegistry?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  school?: string

  @IsOptional()
  @IsString()
  academicInfo?: string

  @IsOptional()
  @IsString()
  socialActivity?: string

  @IsOptional()
  @IsString()
  discount?: string
}
