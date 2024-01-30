import { Injectable } from "@nestjs/common";
import { CreateViewDto } from "./dto/create-view.dto";
import { UpdateViewDto } from "./dto/update-view.dto";
import { PrismaService } from "../prisma.service";
import { forEachResolvedProjectReference } from "ts-loader/dist/instances";
import { ConfigService } from "@nestjs/config";
import { LogEnum } from "../enum/config.enum";

@Injectable()
export class ViewsService {
  constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) {
  }

  create(createViewDto: CreateViewDto) {
    return this.prisma.view.create({
      data: createViewDto
    });
  }

  async findAll() {
    const res = await this.prisma.view.findMany({
      include: {
        image: true
      }
    });
    return res.map(view => ({
      ...view,
      image: view.image?.name && this.configService.get(LogEnum.BASE_URL) + view.image?.name
    }));
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
