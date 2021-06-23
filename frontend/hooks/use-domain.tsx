import { useState } from 'react'
import { PizzaHabi, PizzaHabiUseCaseNames } from '../../contexts'
import { CreateBuyerParams } from '../../contexts/buyer/use-cases/CreateBuyer'
import { CreatePizzaParams } from '../../contexts/pizza/use-cases/CreatePizza'
import { CreateSaleParams } from '../../contexts/sales/use-cases/CreateSale'

export default function useDomain(useCaseName: PizzaHabiUseCaseNames) {
  const [response, setResponse] = useState<{
    loading: boolean
    data: object | null
    error: string | null
  }>({
    loading: false,
    data: null,
    error: null
  })

  const useCase = function (
    paramsUseCase: CreatePizzaParams &
      CreateBuyerParams &
      CreateSaleParams &
      undefined
  ) {
    setResponse({ loading: true, data: null, error: null })

    PizzaHabi[useCaseName]
      .run(paramsUseCase)
      .then(data => setResponse({ loading: false, data, error: null }))
      .catch(error => {
        setResponse({ loading: false, data: null, error })
      })
  }

  return [response, useCase]
}
