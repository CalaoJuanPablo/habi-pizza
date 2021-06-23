import { FC, useState } from 'react'
import { BuyerFormProps, IFormInput, CreateSaleStateType } from './types'
import { useForm } from 'react-hook-form'
import { pizzaHabiUseCases } from '../../../contexts'
import { SuccessOrder } from '../SuccessOrder'
import { joinName, parsePhoneNumber } from '../../helpers'
import styles from './BuyerForm.module.css'

export const BuyerForm: FC<BuyerFormProps> = ({
  pizzaInstance,
  onChangeStepBW,
  onReturnToHome
}) => {
  const [createSaleState, setCreateSaleState] =
    useState<CreateSaleStateType>('idle')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>()

  const handleGoBackClick = () => onChangeStepBW()

  const onSubmit = async (data: IFormInput) => {
    try {
      const buyer = pizzaHabiUseCases.create_buyer.run({
        name: joinName(data.firstName, data.lastName),
        phonNumber: parsePhoneNumber(data.phoneNumber)
      })

      await pizzaHabiUseCases.create_sale.run({
        pizza: pizzaInstance,
        buyer
      })

      setCreateSaleState('success')
    } catch (err) {
      console.error(err)
      setCreateSaleState('error')
    }
  }

  if (createSaleState === 'success')
    return <SuccessOrder onReturnToHome={onReturnToHome} />

  return (
    <>
      <form className={styles.BuyerForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>Agrega información del comprador</h2>
        <label>
          Nombre
          <input {...register('firstName', { required: true })} />
          {errors.firstName?.type === 'required' && '* Este campo es requerido'}
        </label>
        <label>
          Apellido
          <input {...register('lastName', { required: true })} />
          {errors.firstName?.type === 'required' && '* Este campo es requerido'}
        </label>
        <label>
          Teléfono
          <input type='tel' {...register('phoneNumber', { required: true })} />
          {errors.firstName?.type === 'required' && '* Este campo es requerido'}
        </label>
        <div className={styles.button_section}>
          <button
            className={`${styles.button} ${styles.back}`}
            type='button'
            onClick={handleGoBackClick}
          >
            Atrás
          </button>
          <button className={styles.button} type='submit'>
            Crear orden
          </button>
        </div>
        {createSaleState === 'error' && (
          <h1>Ha ocurrido un error. Intenta más tarde</h1>
        )}
      </form>
    </>
  )
}
