import { Pizza } from '../../../contexts/pizza/domain/Pizza'
import { IngredientRawType } from '../HomePage'

export type PizzaFormProps = {
  ingredients: IngredientRawType[]
  pizzaInstance: Pizza
}
