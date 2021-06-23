import { IngredientRepository } from '../domain/IngredientsRepository'
import { Ingredient } from '../domain/Ingredient'
import { UseCaseAsync } from '../../shared/interfaces/UseCase'
import { Fetcher } from '../../shared/types/fetcher'

interface IGetIngredients {
  baseUrl: string
  fetcher: Fetcher
  repository: IngredientRepository
}

export class GetIngredients implements UseCaseAsync<null, Array<Ingredient>> {
  readonly baseUrl: string
  readonly fetcher: Fetcher
  readonly repository: IngredientRepository

  constructor({ baseUrl, fetcher, repository }: IGetIngredients) {
    this.baseUrl = baseUrl
    this.fetcher = fetcher
    this.repository = repository
  }

  async run() {
    const ingredients = await this.repository.getAll()

    return ingredients
  }
}
