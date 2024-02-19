import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma.service";
import { GetUserDto } from "./dto/get-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createUserDto: CreateUserDto) {
    const { username, password, profile, roles } = createUserDto;

    /*const userRoles = await this.prisma.role.findMany({
      where: {
        id: {
          in: roles
        }
      }
    });

    console.log("userRoles");
    console.log(userRoles);*/

    return this.prisma.user.create({
      data: {
        username,
        password,
        profile: {
          create: profile
        },
        roles: {
          create: roles.map(roleId => ({
            role: {
              connect: {
                id: roleId
              }
            }
          }))
        }
      }
    });
  }

  async findAll(query: GetUserDto) {
    const { limit, page, username, roleId, gender } = query;

    const take = limit || 10;

    const result = await this.prisma.user.findMany({
      where: {
        username,
        profile: {
          gender: +gender
        },
        roles: roleId && {
          some: {
            roleId: +roleId
          }
        }
      },
      select: {
        id: true,
        username: true,
        profile: true,
        roles: {
          select: {
            role: true
          }
        }
      },
      /*include: {
        profile: true,
        roles: {
          include: {
            role: true
          }
        }
      },*/
      take,
      skip: (page - 1) * take
    });

    return result.map(user => {
      return {
        ...user,
        roles: user.roles.map(role => role.role)
      };
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, profile, roles } = updateUserDto;

    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        username,
        password,
        profile: {
          update: {
            data: profile
          }
        },
        roles: {
          deleteMany: {},
          create: roles.map(roleId => ({
            role: {
              connect: {
                id: roleId
              }
            }
          }))
        }
      }
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id
      }
    });
  }
}
