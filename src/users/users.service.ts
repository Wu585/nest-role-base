import { ForbiddenException, Injectable, SerializeOptions } from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {PrismaService} from "../prisma.service";
import {GetUserDto} from "./dto/get-user.dto";
import * as argon2 from "argon2";
import {error} from "winston";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createUserDto: CreateUserDto) {
    const {username, password, profile, roles} = createUserDto;

    const user = await this.prisma.user.findUnique({
      where: {
        username
      }
    })

    if (user) {
      throw new ForbiddenException('用户已存在')
    }

    /*const userRoles = await this.prisma.role.findMany({
      where: {
        id: {
          in: roles
        }
      }
    });

    console.log("userRoles");
    console.log(userRoles);*/

    let updatedRoles = roles;
    if (!updatedRoles) {
      updatedRoles = [3];
    }

    const secretPassword = await argon2.hash(password);

    const res = await this.prisma.user.create({
      data: {
        username,
        password: secretPassword,
        profile: {
          create: profile
        },
        roles: {
          create: updatedRoles.map(roleId => ({
            role: {
              connect: {
                id: roleId
              }
            }
          }))
        }
      },
      include: {
        roles: {
          select: {
            role: true
          }
        },
        profile: true
      }
    });

    return {
      ...res,
      roles: res.roles.map(role => role.role)
    }
  }

  async findAll(query: GetUserDto) {
    const {perPage, page, username, roleId, gender} = query;

    const _page = page || 1;
    const take = perPage || 10;

    const result = await this.prisma.user.findMany({
      where: {
        username,
        profile: {
          gender
        },
        roles: roleId && {
          some: {
            roleId
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
      skip: (_page - 1) * take
    });

    return result.map(user => {
      return {
        ...user,
        roles: user.roles.map(role => role.role)
      };
    });
  }

  async findOne(id: number) {
    const result = await this.prisma.user.findUnique({
      where: {
        id
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
      }
    });

    return {
      ...result,
      roles: result?.roles?.map(role => role.role)
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const {username, password, profile, roles} = updateUserDto;

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
