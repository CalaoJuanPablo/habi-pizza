import { IngredientJSONServerRepository } from './ingredient/infraestructure/IngredientJSONServerRepository'
import { CreateBuyer } from './buyer/use-cases/CreateBuyer'
import { GetIngredients } from './ingredient/use-cases/GetIngredients'
import { CreatePizza } from './pizza/use-cases/CreatePizza'
import { SalesJSONServerRepository } from './sales/infraestructure/SalesJSONServerRepository'
import { CreateSale } from './sales/use-cases/CreateSale'
import { GetAllSales } from './sales/use-cases/GetAllSales'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export type PizzaHabiUseCaseNames =
  | 'create_pizza'
  | 'create_buyer'
  | 'get_ingredients'
  | 'create_sale'
  | 'get_all_sales'

class PizzaHabiUseCasesFactory {
  static createPizzaUseCase = () => new CreatePizza()
  static createBuyerUseCase = () => new CreateBuyer()
  static getIngredientsUseCase = ({ baseUrl }: { baseUrl: string }) =>
    new GetIngredients({
      repository: new IngredientJSONServerRepository({ baseUrl })
    })
  static createSaleUseCase = ({ baseUrl }: { baseUrl: string }) =>
    new CreateSale({
      repository: new SalesJSONServerRepository({ baseUrl })
    })
  static getAllSalesUseCase = ({ baseUrl }: { baseUrl: string }) =>
    new GetAllSales({
      repository: new SalesJSONServerRepository({ baseUrl })
    })
}

export const pizzaHabiUseCases = {
  create_pizza: PizzaHabiUseCasesFactory.createPizzaUseCase(),
  create_buyer: PizzaHabiUseCasesFactory.createBuyerUseCase(),
  get_ingredients: PizzaHabiUseCasesFactory.getIngredientsUseCase({
    baseUrl: BASE_URL
  }),
  create_sale: PizzaHabiUseCasesFactory.createSaleUseCase({
    baseUrl: BASE_URL
  }),
  get_all_sales: PizzaHabiUseCasesFactory.getAllSalesUseCase({
    baseUrl: BASE_URL
  })
}
