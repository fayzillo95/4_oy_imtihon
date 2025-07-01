import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { Actions } from '../../core/types/users.types';
import { Permission } from 'src/modules/security/admin/entities/permission.entity';
import { Request } from 'express';
import { Op } from 'sequelize';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(Permission) private permissionModel: typeof Permission,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const modelname = this.reflector.get<string>(
      'modelname',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const permissionSts = await this.checkPermission(context, request);
    return permissionSts;
  }
  async checkPermission(context: ExecutionContext, req: Request) {
    const isPublic = await this.isPublic(req, context);
    if (isPublic) {
      return true;
    }
    const modelname = this.reflector.get<string>(
      'modelname',
      context.getClass(),
    );
    const method = req.method as Actions;
    const userId = req['user']?.id;
    const role = req['user']?.role;
    const permission = await this.permissionModel.findAll({
      where: {
        [Op.and]: {
          user_id: userId,
          model: modelname,
        },
      },
    });
    const permissions = permission.map((p) => p.toJSON().model);
    const actionns = permission.map((p) =>
      p.toJSON().model === modelname ? p.actions : false,
    );
    console.log(role);
    if (
      role === 'superadmin' ||
      modelname === 'profile' ||
      (permissions.includes(modelname) && actionns.flat().includes(method))
    ) {
      console.log(modelname, method, userId);
      return true;
    } else {
      throw new UnauthorizedException(
        `User not allowed ${method} model ${modelname}`,
      );
    }
  }
  async isPublic(req: Request, ctx: ExecutionContext) {
    const publicList = this.reflector.getAllAndOverride('isPublic', [
      ctx.getClass(),
      ctx.getHandler(),
    ]);
    // console.log("Permission guard isPublic function getAllAndOverrirde reflector function returns -> ",publicList)
    return publicList;
  }
}
