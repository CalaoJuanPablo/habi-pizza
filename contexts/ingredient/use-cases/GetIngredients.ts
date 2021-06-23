import { IngredientRepository } from '../domain/IngredientsRepository'
import { Ingredient } from '../domain/Ingredient'
import { UseCaseAsync } from '../../shared/interfaces/UseCase'
import { Fetcher } from '../../shared/types/fetcher'

interface IGetIngredients {
  repository: IngredientRepository
}

export class GetIngredients implements UseCaseAsync<null, Array<Ingredient>> {
  readonly repository: IngredientRepository

  constructor({ repository }: IGetIngredients) {
    this.repository = repository
  }

  async run() {
    const ingredients = await this.repository.getAll()

    return ingredients
  }
}
