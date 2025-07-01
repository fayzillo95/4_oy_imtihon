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
import { WatchHistoryService } from './watch-history.service';
import { CreateWatchHistoryDto } from './dto/create-watch-history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch-history.dto';
import { ApiCookieAuth } from '@nestjs/swagger';
import { Models } from 'src/core/types/users.types';
import { Request, Response } from 'express';

@Controller('watch-history')
@ApiCookieAuth('Witch History !')
@SetMetadata('modelname', Models.WatchHistory)
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) { }

  @Post("create-one")
  create(
    @Req() req: Request,
    @Body() data: CreateWatchHistoryDto) {
    const user_id = req['user'].id
    return this.watchHistoryService.create(data, user_id);
  }

  @Get("get-all")
  findAll(@Req() req: Request) {
    const user_id = req['user'].id
    return this.watchHistoryService.findAll();
  }

  @Get('get-one/:id')
  findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    const user_id = req['user'].id;
    this.watchHistoryService.findOne(id)
      .then(result => res.status(200).json(result))
      .catch(err => res.status(err.status || 404).json({ message: err.message }));
  }


  @Patch('update-one/:id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateWatchHistoryDto, @Req() req: Request,
  ) {
    const user_id = req['user'].id
    return this.watchHistoryService.update(id, data);
  }

  @Delete('destroy-one/:id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const user_id = req['user'].id
    return this.watchHistoryService.remove(id);
  }
}
