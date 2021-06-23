import { Buyer } from '../../buyer/domain/Buyer'
import { BuyerId } from '../../buyer/domain/BuyerId'
import { BuyerName } from '../../buyer/domain/BuyerName'
import { BuyerPhoneNumber } from '../../buyer/domain/BuyerPhoneNumber'
import { Ingredient } from '../../ingredient/domain/Ingredient'
import { Pizza } from '../../pizza/domain/Pizza'
import { PizzaId } from '../../pizza/domain/PizzaId'
import { PizzaName } from '../../pizza/domain/PizzaName'
import { Sale } from '../domain/Sale'
import { SaleDate } from '../domain/SaleDate'
import { SaleId } from '../domain/SaleId'
import { CreateSaleParams, SalesRepository } from '../domain/SalesRepository'

interface ISalesJSONServerRepository {
  baseUrl: string
}

type SalesJSONServerRepositoryResponse = {
  id: string
  pizza: {
    id: string
    name: string
    ingredients: {
      name: string
      price: number
    }[]
    price: number
  }
  buyer: {
    id: string
    name: string
    phoneNumer: number
  }
  date: number
}

export class SalesJSONServerRepository implements SalesRepository {
  readonly baseUrl: string

  constructor({ baseUrl }: ISalesJSONServerRepository) {
    this.baseUrl = baseUrl
  }

  async findAll() {
    const response = await fetch(`${this.baseUrl}/sales`)
    const data = (await response.json()) as SalesJSONServerRepositoryResponse[]

    return data.map(
      sale =>
        new Sale({
          id: new SaleId(sale.id),
          pizza: new Pizza({
            id: new PizzaId(sale.pizza.id),
            name: new PizzaName(sale.pizza.name),
            ingredients: sale.pizza.ingredients.map(
              ({ name, price }) => new Ingredient({ name, price })
            )
          }),
          buyer: new Buyer({
            id: new BuyerId(sale.buyer.id),
            name: new BuyerName(sale.buyer.name),
            phoneNumer: new BuyerPhoneNumber(sale.buyer.phoneNumer)
          }),
          date: new SaleDate(sale.date)
        })
    )
  }

  async find(id: SaleId) {
    const response = await fetch(`${this.baseUrl}/sales/${id.value}`)
    const data = (await response.json()) as SalesJSONServerRepositoryResponse

    return new Sale({
      id: new SaleId(data.id),
      pizza: new Pizza({
        id: new PizzaId(data.pizza.id),
        name: new PizzaName(data.pizza.name),
        ingredients: data.pizza.ingredients.map(
          ({ name, price }) => new Ingredient({ name, price })
        )
      }),
      buyer: new Buyer({
        id: new BuyerId(data.buyer.id),
        name: new BuyerName(data.buyer.name),
        phoneNumer: new BuyerPhoneNumber(data.buyer.phoneNumer)
      }),
      date: new SaleDate(data.date)
    })
  }

  async add({ id, pizza, buyer }: CreateSaleParams) {
    const body = {
      id: id.toString(),
      pizza: pizza.toJSON(),
      buyer: buyer.toJSON()
    }

    const response = await fetch(`${this.baseUrl}/sales`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
    const data = (await response.json()) as SalesJSONServerRepositoryResponse

    return new Sale({
      id: new SaleId(data.id),
      pizza: new Pizza({
        id: new PizzaId(data.pizza.id),
        name: new PizzaName(data.pizza.name),
        ingredients: data.pizza.ingredients.map(
          ({ name, price }) => new Ingredient({ name, price })
        )
      }),
      buyer: new Buyer({
        id: new BuyerId(data.buyer.id),
        name: new BuyerName(data.buyer.name),
        phoneNumer: new BuyerPhoneNumber(data.buyer.phoneNumer)
      }),
      date: new SaleDate(data.date)
    })
  }
}
