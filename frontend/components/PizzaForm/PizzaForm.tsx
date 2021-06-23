import { FC, useState } from 'react'
import { PizzaFormProps } from './types'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { capitalize } from '../../helpers'
import { IngredientRawType } from '../HomePage'
import { Ingredient } from '../../../contexts/ingredient/domain/Ingredient'

type selectOption = { label: string; value: string }

interface IFormInput {
  selectedIngredients: selectOption[]
}

export const PizzaForm: FC<PizzaFormProps> = ({
  ingredients,
  pizzaInstance
}) => {
  const [selectedIngredientsValue, setSelectedIngredientsValue] = useState<
    selectOption[]
  >([])

  const ingredientsByName = ingredients.reduce(
    (byName: { [key: string]: IngredientRawType }, ingr) => {
      byName[ingr.name] = ingr

      return byName
    },
    {}
  )
  const ingredientsMappedForSelectOptions = ingredients.map(({ name }) => ({
    label: capitalize(name),
    value: name
  }))

  const { control, handleSubmit } = useForm<IFormInput>()

  const onSubmit = (data: IFormInput) => {
    const ingrValuesArr = data.selectedIngredients.map(ingr => ingr.value)
    const selectedIngredients = ingrValuesArr.map(
      value => ingredientsByName[value]
    )

    pizzaInstance.updateIngredients(
      selectedIngredients.map(
        ({ name, price }) => new Ingredient({ name, price })
      )
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Escoge los sabores que desees</label>
      <Controller
        name='selectedIngredients'
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            onChange={data => {
              const ingrValuesArr = data.map(ingr => ingr.value)
              const selectedIngredients = ingrValuesArr.map(
                value => ingredientsByName[value]
              )

              pizzaInstance.updateIngredients(
                selectedIngredients.map(
                  ({ name, price }) => new Ingredient({ name, price })
                )
              )

              setSelectedIngredientsValue(data as selectOption[])
            }}
            value={selectedIngredientsValue}
            options={ingredientsMappedForSelectOptions}
          />
        )}
        control={control}
      />

      <h1>{pizzaInstance.price.value}</h1>

      <button type='submit'>Calcular precio</button>
    </form>
  )
}
