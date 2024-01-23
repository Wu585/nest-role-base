import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger
  ) {
    this.logger.log("UserController init");
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    this.logger.log("info");
    this.logger.warn("warn");
    this.logger.debug("debug");
    this.logger.error("error");
    throw new HttpException("未认证", HttpStatus.FORBIDDEN);
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
