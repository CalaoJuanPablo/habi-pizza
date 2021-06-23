import { FC, useState } from 'react'
import { pizzaHabiUseCases } from '../../../contexts'
import { Pizza } from '../../../contexts/pizza/domain/Pizza'
import { IngredientRawType } from './types'
import { PizzaForm } from '../PizzaForm'
import { BuyerForm } from '../BuyerForm'
import styles from './HomePage.module.css'

export const HomePage: FC = () => {
  const [step, setStep] = useState<'step_one' | 'step_two' | 'step_three'>(
    'step_one'
  )
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

      setStep('step_two')
    } catch (err) {
      setIngredients({ loading: false, data: null, error: err })
      console.error(err)
    }
  }

  return (
    <section className={styles.HomePage}>
      {ingredients.loading && <h3>Cargando...</h3>}
      {step === 'step_one' && (
        <button className={styles.button} onClick={handleNewPizzaClick}>
          Crear nueva pizza
        </button>
      )}
      {ingredients.error && <h3>Ha ocurrido un error. Intenta nuevamente</h3>}
      {ingredients.data &&
        ingredients.data.length > 0 &&
        pizza &&
        step === 'step_two' && (
          <PizzaForm
            ingredients={ingredients.data}
            pizzaInstance={pizza}
            onChangeStepFW={() => setStep('step_three')}
          />
        )}
      {pizza && step === 'step_three' && (
        <BuyerForm
          pizzaInstance={pizza}
          onChangeStepBW={() => setStep('step_two')}
          onReturnToHome={() => setStep('step_one')}
        />
      )}
    </section>
  )
}
