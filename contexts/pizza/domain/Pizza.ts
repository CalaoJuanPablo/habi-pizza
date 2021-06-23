import { PizzaId } from './PizzaId'
import { PizzaName } from './PizzaName'
import { IIngredient, Ingredient } from '../../ingredient/domain/Ingredient'
import { PizzaPrice } from './PizzaPrice'

const BASE_PRICE = 10000

interface IPizza {
  id: PizzaId
  name: PizzaName
  ingredients: Array<Ingredient>
}

export class Pizza {
  readonly id: PizzaId
  readonly name: PizzaName
  ingredients: Array<Ingredient>
  price: PizzaPrice

  constructor({ id, name, ingredients }: IPizza) {
    this.id = id
    this.name = name
    this.ingredients = ingredients
    this.price = new PizzaPrice(BASE_PRICE)
  }

  static fromJSON(rawData: {
    id: string
    name: string
    ingredients: IIngredient[]
  }): Pizza {
    return new Pizza({
      id: new PizzaId(rawData.id),
      name: new PizzaName(rawData.name),
      ingredients: rawData.ingredients.map(
        ingredient => new Ingredient(ingredient)
      )
    })
  }

  toJSON() {
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      ingredients: this.ingredients.map(ingredient => ingredient.toJSON()),
      price: this.price.toNumber()
    }
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)

    this.calculatePrice()
  }

  removeIngredient(ingredient: Ingredient) {
    this.ingredients = this.ingredients.filter(
      ingr => ingr.name !== ingredient.name
    )

    this.calculatePrice()
  }

  private calculatePrice() {
    const ingredietnsPrice = this.ingredients
      .map(ingredient => ingredient.price)
      .reduce((acum, curr) => acum + curr, 0)

    this.price = new PizzaPrice(BASE_PRICE + ingredietnsPrice)
  }
}
