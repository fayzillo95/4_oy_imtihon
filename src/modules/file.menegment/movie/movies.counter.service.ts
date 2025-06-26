import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateMoviesCounterDto } from './dto/create-movies.counter.dto';
import { UpdateMoviesCounterDto } from './dto/update-movies.counter.dto';
import { MoviesCounter } from './entities/movies.entity';
import { CategoryCounterService } from '../categories/category.service.service';


@Injectable()
export class MoviesCounterService {
  constructor(
    private readonly movieModel: typeof MoviesCounter,
    private readonly categoriyService: CategoryCounterService
  ) { }

  async create(createMoviesCounterDto: CreateMoviesCounterDto) : Promise<MoviesCounter> {
    const exists = () => {
      return Promise.all(
        createMoviesCounterDto.categories.map(category => {
          return new Promise(async (resolve, reject) => {
            const found = await this.categoriyService.findByName(category);
            found ? resolve(found) : reject(`Category not found: ${category}`);
          });
        })
      );
    };

    return new Promise((resolve, reject) => {
      exists()
        .then(async (resolveArray) => {
          const newMovie = new MoviesCounter();

          for (let [key, value] of Object.entries(createMoviesCounterDto)) {
            newMovie[key] = value;
          }

          await newMovie.save();
          resolve(newMovie.toJSON());
        })
        .catch(err => {
          reject(new BadRequestException("Invalid categories: " + err));
        });
    })

  }

  findAll() {
    return `This action returns all moviesCounter`;
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
