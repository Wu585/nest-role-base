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

  @Can(Action.Create, 'Role')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Can(Action.Read, 'Role')
  @Get()
  // @Cannot(Action.Update, 'Role')
  findAll() {
    return this.rolesService.findAll();
  }

  @Can(Action.Read, 'Role')
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Can(Action.Update, 'Role')
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Can(Action.Delete, 'Role')
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
