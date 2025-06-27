import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateFileDto, CreateMovieDto } from './dto/create-movies.dto';
import { UpdateMoviesCounterDto } from './dto/update-movies.dto';
import { Movies } from './entities/movies.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { MovieCategory } from './entities/category.entity';
import { MovieFile } from './entities/movie_file.entity';
import { MovieCategories } from './entities/movie.categories';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MoviesCounterService {
  constructor(
    @InjectModel(Movies) private readonly movieModel: typeof Movies,
    @InjectModel(MovieCategory)
    private readonly categoriyModel: typeof MovieCategory,
    @InjectModel(MovieFile) private readonly fileModel: typeof MovieFile,
    private readonly config: ConfigService,
    @InjectModel(MovieCategories) private readonly m_categoriesModel: typeof MovieCategories
  ) { }

  async create(data: CreateMovieDto, poster: Express.Multer.File): Promise<Movies | any> {
    const categories : MovieCategories[] = []
    const exists = () => {
      return Promise.all(
        data.category_ids.map((id) => {
          return new Promise(async (resolve, reject) => {
            const exists = await this.categoriyModel.findOne({
              where: { id },
            });
            if (exists) {
              resolve(exists.id)
            }
            else reject(`Category not exists: ${id}`);
          });
        }),
      );
    };
    const slug = uuidv4() + data.title.toLocaleLowerCase().replaceAll(" ", "-")
    return new Promise((resolve, reject) => {
      exists()
        .then(async (resolveArray) => {
          const newMovie = new Movies();

          for (let [key, value] of Object.entries(data)) {
            if (key == "category_ids") {
              for(let category_id of resolveArray){
                const ct = await this.m_categoriesModel.create({
                  movie_id : newMovie.id,
                  category_id
                })
                categories.push(ct)
              }
            } else {
              newMovie[key] = value;
            }
          }
          newMovie['poster_url'] = this.getUrl(poster.filename)
          newMovie.slug = slug
          await newMovie.save();
          resolve([newMovie.toJSON(),categories]);
        })
        .catch((err) => {
          reject(new BadRequestException('Invalid categories: ' + err));
        });
    });
  }

  async writeMovie(data: CreateFileDto, file: Express.Multer.File, id: string) {
    data['file_url'] = this.getUrl(file.filename)
    data["movie_id"] = id
    data["size_mb"] = (file.size / 1024) / 1024
    const newFile = await this.fileModel.create({ ...data })
    return newFile
  }
  getUrl(name: string) {
    const host = this.config.get<string>("APP_HOST")
    const port = this.config.get<string>("APP_PORT")
    return `http://${host}:${port}/posters/${name}`
  }
  async findAll() {
    const movies = await this.movieModel.findAll()
    return movies
  }

  findOne(id: number) {
    return `This action returns a #${id} moviesCounter`;
  }

  update(id: number, updateMoviesCounterDto: UpdateMoviesCounterDto) {
    return `This action updates a #${id} moviesCounter`;
  }

  remove(id: number) {
    return `This action removes a #${id} moviesCounter`;
  }
}
