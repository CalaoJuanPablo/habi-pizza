import { Fetcher } from '../../shared/types/fetcher'
import { Ingredient } from '../domain/Ingredient'
import { IngredientRepository } from '../domain/IngredientsRepository'

interface IIngredientJSONServerRepository {
  baseUrl: string
  fetcher: Fetcher
}

export class IngredientJSONServerRepository implements IngredientRepository {
  readonly baseUrl: string
  readonly fetcher: Fetcher

  constructor({ baseUrl, fetcher }: IIngredientJSONServerRepository) {
    this.baseUrl = baseUrl
    this.fetcher = fetcher
  }

  async getAll() {
    const response = await this.fetcher(this.baseUrl)
    const data = (await response.json()) as Promise<
      Array<{ name: string; price: number }>
    >

    return (await data).map(
      ({ name, price }) => new Ingredient({ name, price })
    )
  }
}
