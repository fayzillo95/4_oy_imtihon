import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateFileDto, CreateMovieDto } from './dto/create-movies.dto';
import { UpdateMoviesCounterDto } from './dto/update-movies.dto';
import { MovieCategory, MovieFile, Movies } from './entities/movies.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesCounterService {
  constructor(
    @InjectModel(Movies) private readonly movieModel: typeof Movies,
    @InjectModel(MovieCategory)
    private readonly categoriyModel: typeof MovieCategory,
    @InjectModel(MovieFile) private readonly fileModel : typeof MovieFile,
    private readonly config: ConfigService
  ) { }

  async create(data: CreateMovieDto, poster: Express.Multer.File): Promise<Movies> {
    const exists = () => {
      return Promise.all(
        data.category_ids.map((id) => {
          return new Promise(async (resolve, reject) => {
            const exists = await this.categoriyModel.findOne({
              where: { id },
            });
            exists ? resolve(exists) : reject(`Category not exists: ${id}`);
          });
        }),
      );
    };
    const slug = data.title.toLocaleLowerCase().replaceAll(" ", "-")
    return new Promise((resolve, reject) => {
      exists()
        .then(async (resolveArray) => {
          const newMovie = new Movies();

          for (let [key, value] of Object.entries(data)) {
            newMovie[key] = value;
          }
          newMovie['poster_url'] = this.getUrl(poster.filename)
          newMovie.slug = slug
          await newMovie.save();
          resolve(newMovie.toJSON());
        })
        .catch((err) => {
          reject(new BadRequestException('Invalid categories: ' + err));
        });
    });
  }
  async writeMovie(data : CreateFileDto, file : Express.Multer.File,id : string){
    data['file_url'] = this.getUrl(file.filename)
    data["movie_id"] = id
    data["size_mb"] = (file.size / 1024) / 1024
    const newFile = await this.fileModel.create({...data})
    return newFile
  }
  getUrl(name : string){
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
