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
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Request } from 'express';
import { validate as isUuid } from 'uuid';
import { ApiCookieAuth } from '@nestjs/swagger';
import { Models } from 'src/core/types/users.types';
import { Response } from 'express';
@Controller('profile')
@SetMetadata('modelname', Models.Profile)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('get-all')
  findAll() {
    return this.profileService.findAll();
  }
  @SetMetadata('isPublic', false)
  @Get('get-one/:id')
  @ApiCookieAuth('Profile in to cookie accesstoken')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Get('my-account')
  @SetMetadata('isPublic', true)
  @ApiCookieAuth('Profile in to cookie accesstoken')
  getMyProfile(@Req() req: Request,
  @Res() res: Response
  ) {
    const { id } = req['user'];
    this.profileService.findByUserId(id);

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    res.cookie('accessToken', accessToken, {
      httpOnly: true,

    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    // http://localhost:15975/api/swagger
    res.redirect(`${process.env.BASE_URL}/api/swagger`);
    return res.json({ accessToken, refreshToken });
  }

  @Patch('update-one/:id')
  @ApiCookieAuth('Profile in to cookie accesstoken')
  @SetMetadata('isPublic', false)
  update(@Param('id') id: string, @Body() data: UpdateProfileDto) {
    if (!isUuid(id)) throw new BadRequestException('Ivalid user id !');
    if (Object.values(data).length === 0)
      throw new BadRequestException('Invalid data empty values or object !');
    return this.profileService.update(id, data);
  }

  @Patch('update-my-profile')
  reassigned(
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req: Request,
  ) {
    const { id } = req['user'];
    return this.profileService.update(id, updateProfileDto);
  }

  @SetMetadata("isPublic", false)
  @Delete('delete-one/:id')
  @ApiCookieAuth('Profile in to cookie accesstoken')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }

  @Delete('delete/my-account')
  @ApiCookieAuth('Profile in to cookie accesstoken')
  deleteMyAccount(@Req() req: Request) {
    const { id } = req['user'];
    return this.profileService.deleteMyAccount(id);
  }
  
}
