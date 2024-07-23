import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryMapper } from './category.mapper'
import { CategoryService } from './category.service'
import { CategoryPublic } from './dto/category'
import { CategoryCreateInput } from './dto/category-create.input'

@Resolver(() => CategoryPublic)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

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
}
