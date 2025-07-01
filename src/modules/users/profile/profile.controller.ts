import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  BadRequestException,
  SetMetadata,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Request } from 'express';
import { validate as isUuid } from 'uuid';
import { ApiCookieAuth } from '@nestjs/swagger';
import { Models } from 'src/core/types/users.types';

@Controller('profile')
@ApiCookieAuth('Profile Controller ')
@SetMetadata('modelname', Models.Profile)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('get-all')
  findAll() {
    return this.profileService.findAll();
  }

  @Get('get-one/:id')
  @ApiCookieAuth('Profile in to cookie accesstoken')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Get('may-accaunt')
  getMyProfile(@Req() req: Request) {
    const { id } = req['user'];
    return this.profileService.findByUserId(id);
  }

  @Patch('update-one/:id')
  update(@Param('id') id: string, @Body() data: UpdateProfileDto) {
    if (!isUuid(id)) throw new BadRequestException('Ivalid user id !');
    if (Object.values(data).length === 0)
      throw new BadRequestException('Invalid data empty values or object !');
    return this.profileService.update(id, data);
  }

  @Patch('update-my/:id')
  reassigned(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete('delete-one/:id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
