import { BuyerId } from './BuyerId'
import { BuyerName } from './BuyerName'
import { BuyerPhoneNumber } from './BuyerPhoneNumber'

interface IBuyer {
  id: BuyerId
  name: BuyerName
  phoneNumer: BuyerPhoneNumber
}

export class Buyer {
  readonly id: BuyerId
  readonly name: BuyerName
  readonly phoneNumer: BuyerPhoneNumber

  constructor({ id, name, phoneNumer }: IBuyer) {
    this.id = id
    this.name = name
    this.phoneNumer = phoneNumer
  }

  toJSON() {
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      phoneNumer: this.phoneNumer.toNumber()
    }
  }
}
