import { Buyer } from '../../buyer/domain/Buyer'
import { Pizza } from '../../pizza/domain/Pizza'
import { SaleDate } from './SaleDate'
import { SaleId } from './SaleId'

interface ISale {
  id: SaleId
  pizza: Pizza
  buyer: Buyer
  date: SaleDate
}
export class Sale {
  readonly id: SaleId
  readonly pizza: Pizza
  readonly buyer: Buyer
  readonly date: SaleDate

  constructor({ id, pizza, buyer, date }: ISale) {
    this.id = id
    this.pizza = pizza
    this.buyer = buyer
    this.date = date
  }

  toJSON() {
    return {
      id: this.id.toString(),
      pizza: this.pizza.toJSON(),
      buyer: this.buyer.toJSON(),
      date: this.date.toNumber()
    }
  }
}
