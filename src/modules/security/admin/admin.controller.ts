import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { RoleDto } from './dto/create-admin.dto';
import { UpdatePermission } from './dto/update-admin.dto';
import { Actions, Models } from 'src/core/types/users.types';
import { RoleService } from './services/role.service';
import { CreatePermissionDto } from './dto/create.permission.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly roleService: RoleService,
  ) {}

  @Post('create-role')
  updateRole(@Body() RoleDto: RoleDto) {
    return this.roleService.updateRole(RoleDto);
  }

  @Post('create-permission')
  createPermission(@Body() data: CreatePermissionDto) {
    return this.permissionService.createPermission(data);
  }

  @Get('permissions/getall')
  findAllPermissions() {
    return this.permissionService.findAllPermissions();
  }

  @Get('permission/:id')
  findPermissionByUserId(@Param('id') id: string) {
    return this.permissionService.findPermissionByUserId(id);
  }

  @Patch('update-permission/by-userid/:model/:id')
  update(
    @Param('id') id: string,
    @Param('model') models: Models[],
    @Body() data: Actions[],
  ) {
    return this.permissionService.updatePermissionByUserId(id, models, data);
  }

  @Delete('remove-permission/by-user-id/:id')
  deletePermissionByUserId(@Param('id') id: string) {
    return this.permissionService.deletePermissionByUserId(id);
  }
}
