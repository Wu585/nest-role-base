import { Profile } from "@prisma/client";
import { IsOptional } from "class-validator";

export class CreateUserDto {
  username: string;
  password: string;

  profile?: Profile;

  @IsOptional()
  roles?: number[];
}
