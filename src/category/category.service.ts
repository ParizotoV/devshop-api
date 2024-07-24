import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './category.entity'
import { CategoryPublic } from './dto/category'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async findAll(): Promise<CategoryPublic[]> {
    return await this.categoryRepository.find()
  }

  async findById(id: string): Promise<CategoryPublic> {
    return await this.categorFyRepository.findOne({ where: { id } })
  }

  async create(input: Category): Promise<Category> {
    return await this.categoryRepository.save(input)
  }

  async update(input: Category): Promise<Category> {
    await this.categoryRepository.update(input?.id, input)
    return input
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.categoryRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }
}
