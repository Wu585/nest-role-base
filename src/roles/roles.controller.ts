import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from "@nestjs/common";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {UpdateRoleDto} from "./dto/update-role.dto";
import {Can, Cannot, CheckPolicies} from "../decorators/casl.decorator";
import {Action} from "../enum/action.enum";
import {CaslGuard} from "../guards/casl.guard";

@Controller("roles")
@UseGuards(CaslGuard)
// @CheckPolicies(ability => ability.can(Action.Read, 'Role'))
export class RolesController {
  constructor(
    private readonly rolesService: RolesService
  ) {
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Can(Action.Read, 'Role')
  @Cannot(Action.Update, 'Role')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
