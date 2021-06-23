import { Ingredient } from '../ingredient/Ingredient'
import { IngredientRepository } from '../ingredient/IngredientsRepository'

interface IIngredientJSONServerRepository {
  baseUrl: string
  fetcher: (url: string, params?: RequestInit) => Promise<Response>
}

export class IngredientJSONServerRepository implements IngredientRepository {
  readonly baseUrl: string
  readonly fetcher: (url: string, params?: RequestInit) => Promise<Response>

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
