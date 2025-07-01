import { Module } from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { AdminController } from './admin.controller';
import { RoleService } from './services/role.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/user/entities/user.entity';
import { Permission } from './entities/permission.entity';
import { UserService } from 'src/modules/users/user/user.service';
import { Movies } from 'src/modules/file.menegment/movie/entities/movies.entity';
import { Profile } from 'src/modules/users/profile/entities/profile.entity';
import { ProfileModule } from 'src/modules/users/profile/profile.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Permission, Movies, Profile]),
    ProfileModule,
  ],
  controllers: [AdminController],
  providers: [PermissionService, RoleService, UserService],
})
export class AdminModule {}
