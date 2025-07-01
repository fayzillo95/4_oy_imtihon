import { Injectable, NotFoundException, SetMetadata } from '@nestjs/common';
import { CreateUserReviewDto } from './dto/create-user-review.dto';
import { UpdateUserReviewDto } from './dto/update-user-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reviews } from './entities/user-review.entity';
import { User } from '../user/entities/user.entity';
import { Movies } from 'src/modules/file.menegment/movie/entities/movies.entity';
import { Models } from 'src/core/types/users.types';
import { MovieCategories } from 'src/modules/file.menegment/movie/entities/movie.categories';
import { MovieCategory } from 'src/modules/file.menegment/movie/entities/category.entity';
import { ForeignKeyConstraintError, Op } from 'sequelize';

@Injectable()
export class UserReviewsService {
  constructor(
    @InjectModel(Reviews) private reviewsModel: typeof Reviews,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Movies) private movieModel: typeof Movies,
  ) { }
  async create(data: CreateUserReviewDto, user_id: string) {
   
    const existsmovie = await this.movieModel.findOne({
      where: { id: data.movie_id },
    });
    if (!existsmovie) throw new NotFoundException('Movie Not found !');
   
    const existsUser = await this.userModel.findOne({ where: { id: user_id } });
    if (!existsUser) throw new NotFoundException('User not found !');

    // const oldReviewExists = await this.reviewsModel.findOrBuild({
    //   where : {
    //     [Op.and] :{
    //       movie_id : data.movie_id,
    //       user_id : user_id
    //     }
    //   }
    // })

    const newRevierw = await this.reviewsModel.create({
      user_id,
      movie_id: data.movie_id,
      comment: data.comment,
      rating: data.rating,
    });
    return newRevierw;
  }

  async findAll() {
    const comments = await this.reviewsModel.findAll({
      attributes: ["id", "comment", "rating", "createdAt"],
      include: [
        { model: User, attributes: ['username', 'email'] },
        {
          model: Movies,
          attributes: [
            "id",
            "title",
            "rating",
            "slug"
          ],
          include: [
            {
              model: MovieCategories,
              attributes: ["id"],
              include: [
                {
                  model: MovieCategory,
                  attributes: ["id", "name", "slug"]
                }
              ],
            },
          ],
        },
      ],
    });
    return comments;
  }

  async findOne(id: string) {
    const comment = await this.reviewsModel.findOne({
      where: { id: id },
      attributes: ["id", "comment", "rating", "createdAt"],
      include: [
        { model: User, attributes: ['username', 'email'] },
        {
          model: Movies,
          attributes: [
            "id",
            "title",
            "rating",
            "slug"
          ],
          include: [
            {
              model: MovieCategories,
              attributes: ["id"],
              include: [
                {
                  model: MovieCategory,
                  attributes: ["id", "name", "slug"]
                }
              ],
            },
          ],
        },
      ],
    });
    if (!comment) throw new NotFoundException(`Review not found by id : [ ${id} ]`)
    return comment;
  }

  async update(id: string, data: UpdateUserReviewDto) {
    if (!(await this.reviewsModel.findByPk(id)))
      throw new NotFoundException('Review not found by id : ' + `[ ${id} ]`);
    const updatedReview = await this.reviewsModel.update(
      {
        ...data,
      },
      { where: { id }, returning: true },
    );
    return updatedReview;
  }

  async remove(id: string) {
    if (!(await this.reviewsModel.findByPk(id)))
      throw new NotFoundException('Review Not found !');
    try {
      const result = await this.reviewsModel.destroy({ where: { id } });
      return `This action removes a #${id} userReview ${result}`;
    } catch (error) {
      throw new ForeignKeyConstraintError({message : error.message,table : Reviews.name})
    }
  }
}
