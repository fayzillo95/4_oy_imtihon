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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/core/guards/jwtInCookieAuth';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('get-all')
  findAll() {
    return this.profileService.findAll();
  }

  @Get('get-one/:id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Get('may-accaunt')
  @UseGuards(JwtAuthGuard)
  getMyProfile(@Req() req: Request) {
    const { id } = req['user'];
    return this.profileService.findByUserId(id);
  }
  
  @Patch('update-one/:id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
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
