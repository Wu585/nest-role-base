import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {PrismaService} from "../prisma.service";
import {GetUserDto} from "./dto/get-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    })
  }

  async findAll(query: GetUserDto) {
    const {limit, page, username, roleId, gender} = query;

    const take = limit || 10;

    const result = await this.prisma.user.findMany({
      where: {
        username,
        profile: {
          gender: +gender
        },
        roles: {
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
      take: take,
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
