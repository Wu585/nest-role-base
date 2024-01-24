export class GetUserDto {
  page: number;
  limit?: number;
  username?: string;
  roleId?: string;
  gender?: number;
}
