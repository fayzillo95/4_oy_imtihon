import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ProfileService } from '../profile/profile.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly profileService: ProfileService,
  ) { }

  async create(createUserDto: CreateUserDto, isVerify = false) {
    await this.checkExists(createUserDto);
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userModel.create({ ...createUserDto, isVerify });
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

  async checkExists(data: {email? : string, username? : string}) {
      if(data.email){
        const existsByEmail = await this.findByEmail(data.email)
        if (existsByEmail) throw new ConflictException('User eamil already exists !');
      }
      if(data.username){
        const existsByUsername = await this.findByUsername(data.username)
        if (existsByUsername) throw new ConflictException('Username already exists !');
      }
  }

  async findAll() {
    const users = await this.userModel.findAll();
    return users.map((user) => user.toJSON());
  }
  async findById(id: string) {
    const user = await this.userModel.findByPk(id);
    return user;
  }
  async findOne(id: string): Promise<User | null> {
    const exists = await this.userModel.findOne({
      where: { id: id },
    });
    if (!exists) throw new NotFoundException('user not found')
    return exists?.toJSON() || null;
  }

  async update(id: string, data: UpdateUserDto) {
    if (Object.values(data).length === 0) throw new BadRequestException("Invalid data empty values !")
    const existsUser = await this.userModel.findOne({
      where: {
        id: id
      }
    })
    if(!existsUser) throw new NotFoundException(`User not found by id : [${id}]`)
    if(data.password) {
      data.password = await bcrypt.hash(data.password,10)
    }
    const oldUser = await this.userModel.findOne({
      where: {
        id: id
      }
    })
    await this.checkExists(data)
    existsUser.update({...data})
    return {
      message  : `This action updates a #${id} user`,
      oldUser,
      updatedUser : existsUser
    };
  }

  async remove(id: string) {
    const existsUser = await this.userModel.findOne({where : {id : id}});
    if (!existsUser) throw new NotFoundException(`User not found by id : [ ${id} ]`);
    await existsUser.destroy();
    return {message : `This action removes a #${id} user`};
  }

  async destroyMyAccaunt(id: string) {
    const existsUser = await this.userModel.findOne({where : {id : id}});
    if (!existsUser)
      throw new NotFoundException(`User not found by id : [ ${id} ]`);
    await existsUser.destroy();
    return `This action removes a #${id} user`;
  }
}

