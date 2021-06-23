import { Ingredient } from './Ingredient'

export interface IngredientRepository {
  getAll(): Promise<Array<Ingredient>>
}
