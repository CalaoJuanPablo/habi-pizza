import { Ingredient } from '../domain/Ingredient'
import { IngredientRepository } from '../domain/IngredientsRepository'

interface IIngredientJSONServerRepository {
  baseUrl: string
}

export class IngredientJSONServerRepository implements IngredientRepository {
  readonly baseUrl: string

  constructor({ baseUrl }: IIngredientJSONServerRepository) {
    this.baseUrl = baseUrl
  }

  async getAll() {
    const response = await fetch(`${this.baseUrl}/ingredients`)
    const data = (await response.json()) as Promise<
      Array<{ name: string; price: number }>
    >

    return (await data).map(
      ({ name, price }) => new Ingredient({ name, price })
    )
  }
}
