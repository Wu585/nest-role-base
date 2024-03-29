import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { CreateUploadDto } from "./dto/create-upload.dto";
import { UpdateUploadDto } from "./dto/update-upload.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {
  }

  @Post("album")
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file, @Body() body) {
    const viewId = JSON.parse(body.jsonParam).viewId;
    return this.uploadService.upload(viewId, file.filename);
  }

}
