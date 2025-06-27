// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { InjectModel } from '@nestjs/sequelize';
// import { Permission } from 'src/modules/users/admin/entities/admin.entity';
// import { Actions } from '../types/users.types';

// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     @InjectModel(Permission) private permissionModel: typeof Permission
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const modelname = this.reflector.get<string>('modelname', context.getHandler());
//     const request = context.switchToHttp().getRequest();
//     const method = request.method as Actions;
//     const userId = request.user?.id;

//     if (!userId || !modelname) {
//       throw new ForbiddenException('ID yoki model mavjud emas');
//     }

//     // 🔍 Permissionlarni bazadan olib kelamiz
//     const permissions = await this.permissionModel.findAll({
//       where: { user_id: userId },
//     });

//     // ✅ Tekshiruv
//     const allowed = permissions.some(
//       (perm) =>
//         perm.model === modelname &&
//         perm.actions.includes(method)
//     );

//     if (!allowed) {
//       throw new ForbiddenException(
//         `${method} metodi uchun ${modelname} modeliga ruxsatingiz yo‘q`
//       );
//     }

//     return true;
//   }
// }
