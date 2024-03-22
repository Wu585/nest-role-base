import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  HttpException,
  HttpStatus,
  Query, ParseIntPipe,Request
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { GetUserPipe } from "./pipes/get-user.pipe";

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
  findAll(@Query() query: GetUserDto,@Request() req) {
    return this.usersService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    console.log("updateUserDto");
    console.log(updateUserDto);
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.usersService.remove(+id);
  }
}
