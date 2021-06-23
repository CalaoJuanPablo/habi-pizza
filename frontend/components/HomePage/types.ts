export type IngredientRawType = {
  name: string
  price: number
}

export type PizzaRawType = {
  id: string
  name: string
  ingredients: IngredientRawType[]
  price: number
}
