import { Fetcher } from '../../shared/types/fetcher'
import { Sale } from '../domain/Sale'
import { SaleId } from '../domain/SaleId'
import { SalesRepository } from '../domain/SalesRepository'

interface ISalesJSONServerRepository {
  baseUrl: string
  fetcher: Fetcher
}

export class SalesJSONServerRepository implements SalesRepository {
  readonly baseUrl: string
  readonly fetcher: Fetcher

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
