import { Pizza } from '../../../contexts/pizza/domain/Pizza'
import { IngredientRawType } from '../HomePage'

export type PizzaFormProps = {
  ingredients: IngredientRawType[]
  pizzaInstance: Pizza
  onChangeStepFW(): void
}

export interface IFormInput {
  selectedIngredients: selectOption[]
}
