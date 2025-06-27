import { Module } from '@nestjs/common';
import { CategoryService } from './category.service.service';
import { CategoriyController } from './categoriy.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieCategory } from '../movie/entities/category.entity';

@Module({
  imports: [SequelizeModule.forFeature([MovieCategory])],
  controllers: [CategoriyController],
  providers: [CategoryService],
})
export class CategoryModule {}
