import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly profileService: ProfileService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exists = [
      await this.findByEmail(createUserDto.email),
      await this.findByUsername(createUserDto.username),
    ];
    if (exists[0] || exists[1])
      throw new ConflictException('User already exists !');

    const newUser = await this.userModel.create({ ...createUserDto });
    return newUser.toJSON();
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }
  async findByUsername(username: string): Promise<User | null> {
    const exists = await this.userModel.findOne({
      where: { username },
    });
    return exists;
  }
  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number): Promise<User | null> {
    const exists = await this.userModel.findOne({
      where: { id },
    });
    return exists;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
