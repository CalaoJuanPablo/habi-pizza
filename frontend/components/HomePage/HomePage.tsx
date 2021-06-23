import { FC, useState } from 'react'
import { pizzaHabiUseCases } from '../../../contexts'
import { Pizza } from '../../../contexts/pizza/domain/Pizza'
import { IngredientRawType } from './types'
import { PizzaForm } from '../PizzaForm'

export const HomePage: FC = () => {
  const [pizza, setPizza] = useState<Pizza>()
  const [ingredients, setIngredients] = useState<{
    loading: boolean
    data: Array<IngredientRawType> | null
    error: string | null
  }>({ loading: false, data: null, error: null })

  const handleNewPizzaClick = async () => {
    setIngredients({ ...ingredients, loading: true })

    try {
      const resIngredients = await pizzaHabiUseCases.get_ingredients.run()
      const rawIngredients = resIngredients.map(ingr => ingr.toJSON())
      setIngredients({ loading: false, data: rawIngredients, error: null })

      setPizza(
        pizzaHabiUseCases.create_pizza.run({
          name: 'Pizza Name dummie',
          ingredients: []
        })
      )
    } catch (err) {
      setIngredients({ loading: false, data: null, error: err })
      console.error(err)
    }
  }

  return (
    <>
      {ingredients.loading && <h3>Cargando...</h3>}
      {!pizza && (
        <button onClick={handleNewPizzaClick}>Crear nueva pizza</button>
      )}
      {ingredients.error && <h3>Ha ocurrido un error. Intenta nuevamente</h3>}
      {ingredients.data && ingredients.data.length > 0 && pizza && (
        <PizzaForm ingredients={ingredients.data} pizzaInstance={pizza} />
      )}
    </>
  )
}
