import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Models } from 'src/core/types/users.types';
import { Request, Response } from 'express';

@Controller('users')
@SetMetadata('modelname', Models.Users)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @SetMetadata('isPublic', true)
  @Get('getall')
  findAll() {
    return this.userService.findAll();
  }

  @Get('get-one/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('update-one/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete-one/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Delete('delete/my-accaunt')
  async destroyMyAccaunt(@Req() req: Request, @Res() res: Response) {
    const { id } = req['user'];
    try {
      const resultLogOut = await this.userService.destroyMyAccaunt(id);
      const host = process.env.APP_HOST || 'localhost';
      const port = process.env.APP_PORT || '3000';
      res.clearCookie('accesToken');
      res.clearCookie('refreshToken');
      res.redirect(`http://${host}:${port}/home`);
    } catch (err) {
      throw err;
    }
  }
}
