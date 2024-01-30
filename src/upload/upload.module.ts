import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { join, extname } from "path";
import { PrismaService } from "../prisma.service";

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, "../tmp_images"),
      filename(_, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        const fileName = `${new Date().getTime() + extname(file.originalname)}`;
        return callback(null, fileName);
      }
    })
  })],
  controllers: [UploadController],
  providers: [UploadService, PrismaService]
})
export class UploadModule {
}
