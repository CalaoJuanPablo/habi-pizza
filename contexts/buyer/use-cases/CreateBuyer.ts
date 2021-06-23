import { UseCaseAsync } from '../../shared/interfaces/UseCase'
import { Buyer } from '../domain/Buyer'
import { BuyerId } from '../domain/BuyerId'
import { BuyerName } from '../domain/BuyerName'
import { BuyerPhoneNumber } from '../domain/BuyerPhoneNumber'

export type CreateBuyerParams = {
  name: string
  phonNumber: number
}

export class CreateBuyer implements UseCaseAsync<CreateBuyerParams, Buyer> {
  async run({ name, phonNumber }: CreateBuyerParams) {
    const id = BuyerId.random()
    const n = new BuyerName(name)
    const pN = new BuyerPhoneNumber(phonNumber)

    return new Buyer({ id, name: n, phoneNumer: pN })
  }
}
