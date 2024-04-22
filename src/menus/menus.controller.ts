import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import {MenusService} from './menus.service';
import {CreateMenuDto} from './dto/create-menu.dto';
import {UpdateMenuDto} from './dto/update-menu.dto';
import { CaslGuard } from "../guards/casl.guard";
import { Can } from "../decorators/casl.decorator";
import { Action } from "../enum/action.enum";

@Controller('menus')
@UseGuards(CaslGuard)
export class MenusController {
  constructor(private readonly menusService: MenusService) {
  }

  @Can(Action.Create, 'Menu')
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Can(Action.Read, 'Menu')
  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Can(Action.Read, 'Menu')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menusService.findOne(id);
  }

  @Can(Action.Update, 'Menu')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Can(Action.Delete, 'Menu')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menusService.remove(id);
  }
}
