import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile) private readonly profileModel: typeof Profile,
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    const old_profile = await this.findByUserId(createProfileDto.user_id);
    if (old_profile)
      throw new ConflictException(
        'A profile with this user_id already exists!',
      );
    const newProfile = this.profileModel.create({ ...createProfileDto });
    return newProfile;
  }
  async findByUserId(user_id: string): Promise<Profile | null> {
    const profile = await this.profileModel.findOne({
      where: { user_id },
    });
    return profile;
  }
  async findAll(): Promise<Profile[]> {
    const allProfiles = await this.profileModel.findAll();
    return allProfiles.map((profile) => profile.toJSON());
  }

  async findOne(id: string): Promise<Profile | null> {
    const profile = await this.profileModel.findOne({
      where: { id },
    });
    return profile ? profile.toJSON() : null;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException('Profile not found !');
    const updatetedProfile = await this.profileModel.update(
      { ...updateProfileDto },
      {
        where: { id },
      },
    );
    return {
      oldProfiel: exists,
      updatetedProfile,
    };
  }

  async remove(id: string) {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException('Profile not found !');
    const deletedSts = await this.profileModel.destroy({ where: { id } });
    return { deletedSts, exists };
  }
}
