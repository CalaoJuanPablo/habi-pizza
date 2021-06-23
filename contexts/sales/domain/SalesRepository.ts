import { Buyer } from '../../buyer/domain/Buyer'
import { Pizza } from '../../pizza/domain/Pizza'
import { Sale } from './Sale'
import { SaleId } from './SaleId'

export type CreateSaleParams = {
  id: SaleId
  pizza: Pizza
  buyer: Buyer
}
export interface SalesRepository {
  findAll(): Promise<Array<Sale>>
  find(id: SaleId): Promise<Sale>
  add(sale: CreateSaleParams): Promise<Sale>
}
