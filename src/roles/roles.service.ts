import {Injectable} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {
  }

  create(createRoleDto: CreateRoleDto) {
    return this.prismaService.role.create({
      data: createRoleDto
    });
  }

  findAll() {
    return this.prismaService.role.findMany()
  }

  findOne(id: number) {
    return this.prismaService.role.findUnique({
      where: {
        id
      },
      include:{
        menus: true
      }
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prismaService.role.update({
      where: {
        id
      },
      data: updateRoleDto
    });
  }

  remove(id: number) {
    return this.prismaService.role.delete({
      where: {
        id
      }
    });
  }
}
