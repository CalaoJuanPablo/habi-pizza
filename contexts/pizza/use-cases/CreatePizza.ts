import { PizzaId } from '../domain/PizzaId'
import { UseCaseAsync } from '../../shared/interfaces/UseCase'
import { Pizza } from '../domain/Pizza'
import { PizzaName } from '../domain/PizzaName'
import { Ingredient } from '../../ingredient/domain/Ingredient'

export type CreatePizzaParams = {
  name: string
  ingredients: Array<{ name: string; price: number }>
}

export class CreatePizza implements UseCaseAsync<CreatePizzaParams, Pizza> {
  async run({ name, ingredients }: CreatePizzaParams) {
    const pizzaIngredients = ingredients.map(
      ({ name, price }) => new Ingredient({ name, price })
    )
    return new Pizza({
      id: PizzaId.random(),
      name: new PizzaName(name),
      ingredients: pizzaIngredients
    })
  }
}
