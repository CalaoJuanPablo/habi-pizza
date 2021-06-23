import { Sale } from './../Sale'
import { SaleId } from '../SaleId'
import { SalesRepository } from '../SalesRepository'

interface ISalesJSONServerRepository {
  baseUrl: string
  fetcher: (url: string, params?: RequestInit) => Promise<Response>
}

export class SalesJSONServerRepository implements SalesRepository {
  readonly baseUrl: string
  readonly fetcher: (url: string, params?: RequestInit) => Promise<Response>

  constructor({ baseUrl, fetcher }: ISalesJSONServerRepository) {
    this.baseUrl = baseUrl
    this.fetcher = fetcher
  }

  async findAll() {
    const response = await this.fetcher(this.baseUrl)
    const data = await response.json()

    return data
  }

  async find(id: SaleId) {
    const response = await this.fetcher(`${this.baseUrl}/${id.value}`)
    const data = await response.json()

    return data
  }

  async add(sale: Sale) {
    const response = await this.fetcher(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(sale.toJSON())
    })
    const data = await response.json()

    return data
  }
}
