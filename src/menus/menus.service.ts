import {Injectable} from '@nestjs/common';
import {CreateMenuDto} from './dto/create-menu.dto';
import {UpdateMenuDto} from './dto/update-menu.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class MenusService {
  constructor(private readonly prismaService: PrismaService) {
  }

  create(createMenuDto: CreateMenuDto) {
    return this.prismaService.menu.create({
      data: createMenuDto
    });
  }

  findAll() {
    return this.prismaService.menu.findMany();
  }

  findOne(id: number) {
    return this.prismaService.menu.findUnique({
      where: {
        id
      }
    });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.prismaService.menu.update({
      where: {
        id
      },
      data: updateMenuDto
    });
  }

  remove(id: number) {
    return this.prismaService.menu.delete({
      where: {
        id
      }
    });
  }
}
