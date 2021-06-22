export interface IIngredient {
  name: string
  price: number
}

export class Ingredient {
  readonly name: string
  readonly price: number

  constructor({ name, price }: IIngredient) {
    this.name = name
    this.price = price
  }

  toJSON() {
    const { name, price } = this
    return {
      name,
      price
    }
  }
}
