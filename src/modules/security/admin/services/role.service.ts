import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/users/user/entities/user.entity';
import { RoleDto } from '../dto/create-admin.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async updateRole(roleDto: RoleDto) {
    const exists = await this.userModel.findByPk(roleDto.user_id);
    if (!exists) throw new NotFoundException('User not found !');
    exists.role = roleDto.role;
    await exists.save();
    return exists;
  }
}
