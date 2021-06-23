import { PizzaId } from './../pizza/PizzaId'
import { UseCase } from '../../shared/interfaces/UseCase'
import { Pizza } from '../pizza/Pizza'
import { PizzaName } from '../pizza/PizzaName'
import { Ingredient } from '../ingredient/Ingredient'

type CreatePizzaParams = {
  name: string
  ingredients: Array<{ name: string; price: number }>
}

export class CreatePizza implements UseCase<CreatePizzaParams, Pizza> {
  run({ name, ingredients }: CreatePizzaParams) {
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
