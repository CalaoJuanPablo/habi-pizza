import { Sale } from './../Sale'
import { SaleId } from '../SaleId'
import { SalesRepository } from '../SalesRepository'

interface ISalesJSONServerRepository {
  baseUrl: string
}

export class SalesJSONServerRepository implements SalesRepository {
  readonly baseUrl: string

  constructor({ baseUrl }: ISalesJSONServerRepository) {
    this.baseUrl = baseUrl
  }

  async findAll() {
    const response = await fetch(this.baseUrl)
    const data = await response.json()

    return data
  }

  async find(id: SaleId) {
    const response = await fetch(`${this.baseUrl}/${id.value}`)
    const data = await response.json()

    return data
  }

  async add(sale: Sale) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(sale.toJSON())
    })
    const data = await response.json()

    return data
  }
}
