import { Pizza } from '../../../contexts/pizza/domain/Pizza'

export type BuyerFormProps = {
  pizzaInstance: Pizza
  onChangeStepBW(): void
  onReturnToHome(): void
}

export interface IFormInput {
  firstName: string
  lastName: string
  phoneNumber: string
}

export type CreateSaleStateType = 'idle' | 'success' | 'error'
