import { Injectable } from "@nestjs/common";
import { CreateViewDto } from "./dto/create-view.dto";
import { UpdateViewDto } from "./dto/update-view.dto";
import { PrismaService } from "../prisma.service";
import { forEachResolvedProjectReference } from "ts-loader/dist/instances";

@Injectable()
export class ViewsService {
  constructor(private readonly prisma: PrismaService) {
  }

  create(createViewDto: CreateViewDto) {
    return this.prisma.view.create({
      data: createViewDto
    });
  }

  findAll() {
    return this.prisma.view.findMany();
  }

  findOne(id: number) {
    return this.prisma.view.findUnique({
      where: { id }
    });
  }

  update(id: number, updateViewDto: UpdateViewDto) {
    return this.prisma.view.update({
      where: {
        id
      },
      data: updateViewDto
    });
  }

  remove(id: number) {
    return this.prisma.view.delete({
      where: {
        id
      }
    });
  }
}
