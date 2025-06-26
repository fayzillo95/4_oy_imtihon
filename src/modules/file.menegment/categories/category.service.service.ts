import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { MovieCategory } from '../movie/entities/movies.entity';
import { InjectModel } from '@nestjs/sequelize';
import { MovieCategoryCreateDto } from '../movie/dto/movie.category.dto';

@Injectable()
export class CategoryCounterService {
    constructor(
       @InjectModel(MovieCategory) private readonly categoriyModel : typeof MovieCategory 
    ){}
    async createCategory(data : MovieCategoryCreateDto){
        if((await this.findByName(data.name))){
            throw new ConflictException("Category name already exists")
        }else{
            const newCategory = await this.categoriyModel.create({...data})
            return newCategory
        }
    }

    async findAllCategoriy() : Promise<MovieCategory[]>{
        const allCategory = await this.categoriyModel.findAll()
        return allCategory.map(category => category.toJSON())
    }

    async findByName(name : string) : Promise<MovieCategory | null>{
        const exists = await this.categoriyModel.findOne({
            where : {name}
        })
        return exists?.toJSON() ?? null
    }
    
    async findByCategoriyId(id:string) : Promise<MovieCategory | null>{
        const exists = await this.categoriyModel.findByPk(id)
        return exists?.toJSON() ?? null
    }

    async removeCategory(id : string) {
        const oldCategoriy = await this.findByCategoriyId(id)
        if(oldCategoriy){
            await oldCategoriy.destroy()
            return {
                message : "Categoriy deleted !"
            }
        }else{
            throw new NotFoundException("Categoriy not found !")
        }
    }
    
    async updateCategoriy(id : string, data : Partial<MovieCategory>){
        const oldCategoriy = await this.findByCategoriyId(id)
        const updatedCategoriy = await this.findByCategoriyId(id)
        if(updatedCategoriy){
            await updatedCategoriy.update({...data})
            return {
                oldCategoriy,
                updatedCategoriy,
                message : "Categoriy updated !"
            }
        }else{
            throw new NotFoundException("Categoriy not found !")
        }
    }
}
