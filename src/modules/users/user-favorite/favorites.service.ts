import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';
@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite) private readonly favoriteModel: typeof Favorite,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async create(data: CreateFavoriteDto) {
    let exists: User | Favorite | null = await this.userModel.findByPk(
      data.user_id,
    );
    if (!exists) throw new NotFoundException('User not found !');
    exists = await this.favoriteModel.findOne({
      where: {
        [Op.and]: {
          movie_id: data.movie_id,
          user_id: data.user_id,
        },
      },
    });
    if (exists) {
      throw new ConflictException(
        'Movie id already exists user Favorites table !',
      );
    }
    const newFavorite = await this.favoriteModel.create({ ...data });

    return newFavorite;
  }

  async findAll() {
    const favorites = await this.favoriteModel.findAll();
    return favorites;
  }

  async findOne(id: string) {
    const favorite = await this.favoriteModel.findByPk(id);
    if (!favorite) throw new NotFoundException('Favorite not found !');
    return favorite;
  }

  async findByUserId(user_id: string) {
    const exists: Favorite[] | any = this.favoriteModel.findAll({
      where: { user_id },
    });
    // if(typeof exists[0] !== typeof Favorite ){
    //   throw new NotFoundException("Favorites by user_id not found !")
    // }
    return exists;
  }

  async findByMovieId(movie_id: string) {
    const exists: Favorite[] | any = this.favoriteModel.findAll({
      where: { movie_id },
    });
    // if(typeof exists[0] !== typeof Favorite ){
    //   throw new NotFoundException("Favorites by user_id not found !")
    // }
    return exists;
  }

  async update(id: string, data: Partial<CreateFavoriteDto>) {
    const existsFavorite = await this.findOne(id);
    await existsFavorite.update({ ...data });
    return existsFavorite;
  }

  async remove(id: string) {
    const existsFavorite = await this.findOne(id);
    await existsFavorite.destroy();
    return `This action removes a #${id} favorite`;
  }
}
