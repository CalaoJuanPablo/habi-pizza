import { Buyer } from './buyer/Buyer'
import { Pizza } from './pizza/Pizza'
import { SaleId } from './SaleId'

interface ISale {
  id: SaleId
  pizza: Pizza
  buyer: Buyer
}
export class Sale {
  readonly id: SaleId
  readonly pizza: Pizza
  readonly buyer: Buyer

  constructor({ id, pizza, buyer }: ISale) {
    this.id = id
    this.pizza = pizza
    this.buyer = buyer
  }

  toJSON() {
    return {
      id: this.id.toString(),
      pizza: this.pizza.toJSON(),
      buyer: this.buyer.toJSON()
    }
  }
}
