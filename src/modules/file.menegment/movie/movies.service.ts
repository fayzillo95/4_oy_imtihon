import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFileDto, CreateMovieDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { Movies } from './entities/movies.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { MovieCategory } from './entities/category.entity';
import { MovieFile } from './entities/movie_file.entity';
import { MovieCategories } from './entities/movie.categories';
import { v4 as uuidv4 } from 'uuid';
import { existsSync, readFileSync, rmdirSync, rmSync } from 'fs';
import { join } from 'path';
import { WatchHistory } from 'src/modules/users/watch-history/entities/watch-history.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies) private readonly movieModel: typeof Movies,
    @InjectModel(MovieFile) private readonly fileModel: typeof MovieFile,
    @InjectModel(MovieCategory)
    private readonly categoriyModel: typeof MovieCategory,
    @InjectModel(MovieCategories)
    private readonly m_categoriesModel: typeof MovieCategories,
    @InjectModel(WatchHistory)
    private readonly watchHistoryModel: typeof WatchHistory,
    private readonly config: ConfigService,
  ) {}
  /**
   *
   * @param data : object { title : string, description : string, categoriy_ids : string[], duration_minut : number}
   * @param poster : object type Express.Multer.File
   * @returns Promise => Movie
   */
  async create(
    data: CreateMovieDto,
    poster: Express.Multer.File,
  ): Promise<Movies | any> {
    const exists = this.checkCategoryExists(data.category_ids);
    const slug = uuidv4() + data.title.toLocaleLowerCase().replaceAll(' ', '-');

    return new Promise((resolve, reject) => {
      exists
        .then(async (resolveArray) => {
          const newMovie = new Movies();
          let categories: MovieCategories[] = [];
          for (let [key, value] of Object.entries(data)) {
            if (key !== 'category_ids') {
              newMovie[key] = value;
            }
          }
          newMovie['poster_url'] = this.getUrl(poster.filename, 'posters');
          newMovie.slug = slug;
          await newMovie.save();
          categories = await this.createJunctionCt(newMovie.id, resolveArray);
          resolve([newMovie.toJSON(), categories]);
        })
        .catch((err) => {
          reject(new BadRequestException('Categoriy not found ! ' + err));
        });
    });
  }
  /**
   *
   * @param data @object
   * @param file @object
   * @param id @string
   * @returns Promise<MovieFile>
   */
  async writeMovie(data: CreateFileDto, file: Express.Multer.File, id: string) {
    data['file_url'] = this.getUrl(file.filename, 'files');
    data['movie_id'] = id;
    data['size_mb'] = file.size / 1024 / 1024;
    const newFile = await this.fileModel.create({ ...data });
    return newFile;
  }
  /**
   *
   * @param id @string
   * @param resolveArray @massiv
   * @returns Prmise<strig[]>
   */
  async createJunctionCt(id: string, resolveArray: unknown[]) {
    const categories: MovieCategories[] = [];
    for (let category_id of resolveArray) {
      const ct = await this.m_categoriesModel.create({
        movie_id: id,
        category_id,
      });
      categories.push(ct);
    }
    return categories;
  }
  /**
   *
   * @returns Promise<Movies[]>
   */
  async findAll() {
    const movies = await this.movieModel.findAll();
    return movies;
  }
  /**
   *
   * @param id : string type uuidv4
   * @param user_id : string type uuidv4
   */
  async findOneMovieDetailes(id: string, user_id: string) {
    const movieDetailes = await this.movieModel.findByPk(id);
    if (!movieDetailes)
      throw new NotFoundException('Sorry movie detailes not found !');
    const newWatchHitory = await this.watchHistoryModel.create({
      user_id,
      movie_id: movieDetailes.id,
      watched_duration: 0,
      watched_percentage: 0.0,
    });
    return {
      movie_detailes: movieDetailes.toJSON(),
      newWatchHitory,
    };
  }

  /**
   *
   * @param id
   * @param data
   * @param poster
   * @returns
   */
  async update(
    id: string,
    data: UpdateMoviesDto,
    poster: Express.Multer.File | null = null,
  ) {
    const exists = await this.movieModel.findByPk(id);

    if (Object.values(data).length === 0) {
      throw new BadRequestException('Invalid data !');
    }

    if (!exists) throw new BadRequestException('Movie nod found !');

    const deletedCt = await this.removeJunctionCt(exists.id);

    let categories: MovieCategories[] = [];

    if (data.category_ids) {
      try {
        const resolveArray = await this.checkCategoryExists(data.category_ids);
        categories = await this.createJunctionCt(id, resolveArray);
      } catch (error) {
        throw new BadRequestException(error);
      }
    }

    if (data.title) {
      const existsTitle = await this.movieModel.findOne({
        where: {
          title: data.title,
        },
      });
      if (existsTitle && existsTitle.id != id) {
        throw new BadRequestException(`${data.title} already exists ! `);
      }
      data['slug'] =
        '#-' +
        uuidv4() +
        '-' +
        data.title.toLocaleLowerCase().replaceAll(' ', '-');
    }

    if (poster) {
      try {
        const fileName = exists.poster_url.split('/').at(-1);
        if (typeof fileName === 'string') {
          rmSync(join(process.cwd(), 'uploads', 'posters', fileName));
        }
      } catch (error) {
        console.log(error);
      }
      data['poster_url'] = this.getUrl(poster.filename, 'posters');
    }
    const result = await this.movieModel.update({ ...data }, { where: { id } });
    if (result[0] === 0) {
      throw new BadRequestException('Movie not updated or invalid data !');
    }
    return { result, categories };
  }
  /**
   *
   * @param id
   * @returns
   */
  async remove(id: string) {
    const exists = await this.movieModel.findByPk(id);
    if (!exists) throw new NotFoundException('Movie not found ! ');

    try {
      const fileName = exists.poster_url.split('/').at(-1);
      console.log(fileName);
      if (typeof fileName === 'string') {
        rmSync(join(process.cwd(), 'uploads', 'posters', fileName));
      }
    } catch (error) {
      console.log(error);
    }
    await this.removeJunctionCt(exists.id);
    const d_sts = await exists.destroy();
    return `This action removes a #${id} ${d_sts} moviesCounter`;
  }
  /**
   *
   * @param name
   * @param filepath
   * @returns
   */
  getUrl(name: string, filepath: string) {
    const host = this.config.get<string>('APP_HOST');
    const port = this.config.get<string>('APP_PORT');
    return `http://${host}:${port}/${filepath}/${name}`;
  }
  /**
   *
   * @param id
   * @returns
   */
  async removeJunctionCt(id: string) {
    const result = await this.m_categoriesModel.findAll({
      where: {
        movie_id: id,
      },
    });
    if (result[0]) {
      result.map(async (m_ct) => {
        return await m_ct.destroy();
      });
    }
    return result;
  }
  /**
   *
   * @param category_ids
   * @returns
   */
  async checkCategoryExists(category_ids: string[]) {
    return Promise.all(
      category_ids.map((id) => {
        return new Promise(async (resolve, reject) => {
          const exists = await this.categoriyModel.findOne({
            where: { id },
          });
          if (exists) {
            resolve(exists.id);
          } else reject(`Category not exists: ${id}`);
        });
      }),
    );
  }
  /**
   *
   * @returns
   */
  async getAllMCt() {
    const mct = await this.m_categoriesModel.findAll({
      include: [{ model: Movies }, { model: MovieCategory }],
    });
    return mct;
  }
}
