import { Sale } from './Sale'
import { SaleId } from './SaleId'

export interface SalesRepository {
  findAll(): Promise<Array<Sale>>
  find(id: SaleId): Promise<Sale>
  add(sale: Sale): Promise<void>
}
