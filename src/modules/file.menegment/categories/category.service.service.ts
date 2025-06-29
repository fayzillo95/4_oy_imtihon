import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MovieCategory } from '../movie/entities/category.entity';
import { InjectModel } from '@nestjs/sequelize';
import { MovieCategoryCreateDto } from './dto/movie.category.dto';
import { MovieCategoryUpdateDto } from './dto/movie.category.update.dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(MovieCategory)
    private readonly categoriyModel: typeof MovieCategory,
  ) {}

  async createCategory(data: MovieCategoryCreateDto) {
    await this.checkExists(data);
    const slug =
      '#-' +
      uuidv4() +
      '-' +
      data.name.toLocaleLowerCase().replaceAll(' ', '-');
    const newCategory = await this.categoriyModel.create({ ...data, slug });
    return newCategory.toJSON();
  }

  async findAllCategoriy(): Promise<MovieCategory[]> {
    const allCategory = await this.categoriyModel.findAll();
    return allCategory.map((category) => category.toJSON());
  }

  async findByName(name: string): Promise<MovieCategory | null> {
    const exists = await this.categoriyModel.findOne({
      where: { name },
    });
    return exists?.toJSON() ?? null;
  }

  async findBySlug(slug: string): Promise<MovieCategory | null> {
    const exists = await this.categoriyModel.findOne({
      where: { slug },
    });
    return exists?.toJSON() ?? null;
  }

  async findByCategoriyId(id: string): Promise<MovieCategory | null> {
    const exists = await this.categoriyModel.findByPk(id);
    return exists?.toJSON() ?? null;
  }

  async removeCategory(id: string) {
    const oldCategoriy = await this.categoriyModel.findOne({ where: { id } });
    if (oldCategoriy) {
      await oldCategoriy.destroy();
      return {
        message: 'Categoriy deleted !',
      };
    } else {
      throw new NotFoundException('Categoriy not found !');
    }
  }
  async checkExists(data: { name?: string; slug?: string }) {
    if (data.name && (await this.findByName(data.name))) {
      throw new ConflictException('Category name already exists');
    }
    if (data.slug && (await this.findBySlug(data.slug))) {
      throw new ConflictException('Category slug already exists');
    }
  }

  async updateCategoriy(id: string, data: MovieCategoryUpdateDto) {
    if (Object.values(data).length === 0) {
      throw new BadRequestException('Invalid data empty body !');
    }
    await this.checkExists(data);
    const updatedCategoriy = await this.categoriyModel.findByPk(id);

    if (updatedCategoriy) {
      const oldCategoriy = await this.findByCategoriyId(id);
      await updatedCategoriy.update({ ...data });
      return {
        oldCategoriy,
        updatedCategoriy,
        message: 'Categoriy updated !',
      };
    } else {
      throw new NotFoundException('Categoriy not found !');
    }
  }
}
