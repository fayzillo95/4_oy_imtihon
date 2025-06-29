import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleDto } from '../dto/create-admin.dto';
import { UpdatePermission } from '../dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/users/user/entities/user.entity';
import { Movies } from 'src/modules/file.menegment/movie/entities/movies.entity';
import { Permission } from '../entities/permission.entity';
import { UserService } from 'src/modules/users/user/user.service';
import { Op } from 'sequelize';
import { Actions, Models } from 'src/core/types/users.types';
import { CreatePermissionDto } from '../dto/create.permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(Movies) private readonly moviesModel: typeof Movies,
    @InjectModel(Permission)
    private readonly permissionModel: typeof Permission,
  ) {}

  async findAllPermissions() {
    const permissions = await this.permissionModel.findAll();
    return permissions;
  }

  async createPermission(data: Required<CreatePermissionDto>) {
    const existsUser = await this.userService.findById(data.user_id);
    if (!existsUser) throw new NotFoundException('User not found !');
    const newPermission = await this.permissionModel.create({
      ...data,
      actions: [data.actions],
    });
    return newPermission.toJSON();
  }

  async findPermissionByUserId(user_id: string) {
    const permissionUser = await this.permissionModel.findByPk(user_id);
    if (!permissionUser)
      throw new NotFoundException('Permission by user_id not found !');
    return permissionUser;
  }

  async updatePermissionByUserId(
    user_id: string,
    models: Models[],
    data: Actions[],
  ) {
    const userPermission = await this.permissionModel.findAll({
      where: {
        [Op.and]: [
          { user_id },
          {
            model: {
              [Op.in]: models,
            },
          },
        ],
      },
    });
    const permissions: Permission[] = [];
    userPermission.forEach(async (permission) => {
      permission.actions = [...new Set([...data.flat()])];
      await permission.save();
      permissions.push(permission);
    });
    return permissions;
  }

  async updatePermissionByPermissionId(id: string, data: UpdatePermission) {
    const permission = await this.permissionModel.findByPk(id);
    if (!permission) throw new NotFoundException('Permission not found !');
    if (data.actions) {
      permission.update({
        actions: [...new Set([...permission.actions, ...data.actions])],
      });
    }
    if (data.model)
      permission.update({
        model: data.model,
      });
    await permission.save();
    return permission.toJSON();
  }

  async deletePermissionByUserId(user_id: string) {
    const permissionsUser: Permission[] = [];
    const deletedSts: { username: string; sts: boolean }[] = [];
    const permissionExists = await this.permissionModel.findAll({
      where: {
        user_id,
      },
    });
    if (!permissionExists[0])
      throw new NotFoundException('Permission not found !');
    permissionExists.forEach(async (permission) => {
      permissionsUser.push(permission.toJSON());
      const { user_id } = permission;
      const user = await this.userService.findById(user_id);
      const { username } = user ? user.toJSON() : `${user_id}`;
      const sts = await permission.destroy();
      deletedSts.push({ username, sts: sts[0] === 1 ? true : false });
    });

    return { permissionsUser, deletedSts };
  }
  async removePermissionByPermissionId(id: string) {
    const permission = await this.permissionModel.findByPk(id);
    if (!permission) throw new NotFoundException('Permission not found !');
    const deletedSts = await permission.destroy();
    return deletedSts[0] || `Permission not deleted: by ${id}`;
  }
}
