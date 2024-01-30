import { Injectable } from "@nestjs/common";
import { CreateUploadDto } from "./dto/create-upload.dto";
import { UpdateUploadDto } from "./dto/update-upload.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {
  }

  async upload(viewId: number, filename: string) {
    try {
      await this.prisma.image.create({
        data: {
          name: filename,
          viewId
        }
      });
    } catch (err) {
      console.log(err);
    }

    return "hello";
  }
}
