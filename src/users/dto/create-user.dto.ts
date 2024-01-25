import { Profile } from "@prisma/client";

export class CreateUserDto {
  username: string;
  password: string;

  profile?: Profile;

  roles?: number[];
}
