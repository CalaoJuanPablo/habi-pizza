import { FC, useState } from 'react'
import { PizzaFormProps, IFormInput } from './types'
import Select from 'react-select'
import { useForm, Controller, FieldError } from 'react-hook-form'
import { capitalize, parseCurrency } from '../../helpers'
import { IngredientRawType } from '../HomePage'
import { Ingredient } from '../../../contexts/ingredient/domain/Ingredient'
import styles from './PizzaForm.module.css'

type selectOption = { label: string; value: string }

export const PizzaForm: FC<PizzaFormProps> = ({
  ingredients,
  pizzaInstance,
  onChangeStepFW
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
  const ingredientsMappedForSelectOptions = ingredients.map(
    ({ name, price }) => ({
      label: `${capitalize(name)} - ${parseCurrency(price)}`,
      value: name
    })
  )

  const { control, handleSubmit } = useForm<IFormInput>()

  const onSubmit = (data: IFormInput) => {
    onChangeStepFW()
  }

  return (
    <form className={styles.PizzaForm} onSubmit={handleSubmit(onSubmit)}>
      <h2>Prepara tu pizza con los ingredientes que desees</h2>
      <label>Escoge los ingredientes</label>
      <div className={styles.select_container}>
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
      </div>

      <h1 className={styles.price}>
        {parseCurrency(pizzaInstance.price.value)}
      </h1>

      <button className={styles.button} type='submit'>
        Ingresar información del comprador
      </button>
    </form>
  )
}
