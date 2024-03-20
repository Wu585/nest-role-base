import { IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class GetUserDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  page?: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  perPage?: number;

  @IsString()
  @IsOptional()
  username?: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  roleId?: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  gender?: number;
}
