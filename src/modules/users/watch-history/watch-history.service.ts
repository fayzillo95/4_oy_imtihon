import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateWatchHistoryDto } from './dto/create-watch-history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch-history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WatchHistory } from './entities/watch-history.entity';
import { User } from '../user/entities/user.entity';
import { Movies } from 'src/modules/file.menegment/movie/entities/movies.entity';

/**
 *
 */
@Injectable()
export class WatchHistoryService {
  constructor(
    @InjectModel(WatchHistory)
    private readonly watchHistoryModel: typeof WatchHistory,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Movies) private readonly movieModel: typeof Movies,
  ) { }
  /**
   *
   * @param createWatchHistoryDto
   * @returns
   */
  async create(data: CreateWatchHistoryDto, user_id: string) {
    return Promise.all([
      this.movieModel.findOne({ where: { id: data.movie_id } }),
      this.userModel.findOne({ where: { id: user_id } })
    ]).catch(err => {
      throw new NotFoundException(err.message)
    }).then(resolve => {
      return new Promise((resolve, reject) => {
        this.watchHistoryModel.create({
          movie_id: data.movie_id,
          user_id: user_id, watched_duration: data.watched_duration,
          watched_percentage: data.watched_percentage
        }).then(res => resolve(res)).catch(err => reject(err))
      })
    })
  }

  async findAll() {
    const data = await this.watchHistoryModel.findAll();
    return {
      message: `This action returns all watchHistory`,
      data,
    };
  }

findOne(id: string) {
  return this.watchHistoryModel.findOne({ where: { id } })
    .then(result => result || Promise.reject(new NotFoundException(`History not found by id: [${id}]`)));
}


  async update(id: string, data: UpdateWatchHistoryDto) {
    const [found, [affettedCount]] = await Promise.all([
      this.watchHistoryModel.findByPk(id),
      this.watchHistoryModel.update(data, { where: { id: id } })
    ])
    if (!found) throw new NotFoundException("History not found !")
    if (!affettedCount) throw new BadRequestException("Invalid values or ")
    return new Promise((resolve, reject) => {
      this.watchHistoryModel.findOne({where : {id : id}})
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
  }

  remove(id: string) {
    return `This action removes a #${id} watchHistory`;
  }
}
