import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryMapper } from './category.mapper'
import { CategoryService } from './category.service'
import { CategoryPublic } from './dto/category'
import { CategoryCreateInput } from './dto/category-create.input'
import { CategoryUpdateInput } from './dto/category-update.input'

@Resolver(() => CategoryPublic)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => CategoryPublic, { name: 'getCategoryById' })
  async getCategoryById(
    @Args('id')
    id: string,
  ): Promise<CategoryPublic> {
    return await this.categoryService.findById(id)
  }

  @Query(() => [CategoryPublic], { name: 'getAllCategories' })
  async getAllCategories(): Promise<CategoryPublic[]> {
    return await this.categoryService.findAll()
  }

  @Mutation(() => CategoryPublic, { name: 'createCategory' })
  async createCategory(
    @Args('input')
    input: CategoryCreateInput,
  ): Promise<CategoryPublic> {
    return await this.categoryService.create(CategoryMapper.toEntity(input))
  }

  @Mutation(() => Boolean, { name: 'deleteCategory' })
  async deleteCategory(
    @Args('id')
    input: string,
  ): Promise<boolean> {
    return await this.categoryService.delete(input)
  }

  @Mutation(() => CategoryPublic, { name: 'updateCategory' })
  async updateCategory(
    @Args('input')
    input: CategoryUpdateInput,
  ): Promise<CategoryPublic> {
    return await this.categoryService.update(input)
  }
}
