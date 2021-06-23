import { FC, useState } from 'react'
import { BuyerFormProps, IFormInput, CreateSaleStateType } from './types'
import { useForm } from 'react-hook-form'
import { pizzaHabiUseCases } from '../../../contexts'
import { SuccessOrder } from '../SuccessOrder'

const joinName = (firstName: string, lastName: string) =>
  `${firstName} ${lastName}`
const parsePhoneNumber = (phoneNumberStr: string) => Number(phoneNumberStr)

export const BuyerForm: FC<BuyerFormProps> = ({
  pizzaInstance,
  onChangeStepBW
}) => {
  const [createSaleState, setCreateSaleState] =
    useState<CreateSaleStateType>('idle')
  const { register, handleSubmit } = useForm<IFormInput>()

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

  if (createSaleState === 'success') return <SuccessOrder />

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <h3>Agrega información del comprador</h3>
        <label>
          Nombre
          <input {...register('firstName')} />
        </label>
        <label>
          Apellido
          <input {...register('lastName')} />
        </label>
        <label>
          Teléfono
          <input type='tel' {...register('phoneNumber')} />
        </label>
        <div>
          <button type='button' onClick={handleGoBackClick}>
            Atrás
          </button>
          <button type='submit'>Crear orden</button>
        </div>
        {createSaleState === 'error' && (
          <p>Ha ocurrido un error. Intenta más tarde</p>
        )}
      </form>
    </>
  )
}
