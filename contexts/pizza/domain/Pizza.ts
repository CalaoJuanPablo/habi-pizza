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
  name: PizzaName
  ingredients: Array<Ingredient>
  price: PizzaPrice

  constructor({ id, name, ingredients }: IPizza) {
    this.id = id
    this.name = name
    this.ingredients = ingredients
    this.price = new PizzaPrice(BASE_PRICE)
    this.calculatePrice()
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

  updateIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients
    this.calculatePrice()
    this.updateName()
  }

  private updateName() {
    const ingredietnsNames = this.ingredients
      .slice(0, 3)
      .map(({ name }) => name)
    this.name = new PizzaName(`Pizza ${ingredietnsNames.join(', ')}`)
  }

  private calculatePrice() {
    const ingredietnsPrice = this.ingredients
      .map(ingredient => ingredient.price)
      .reduce((acum, curr) => acum + curr, 0)

    this.price = new PizzaPrice(BASE_PRICE + ingredietnsPrice)
  }
}
