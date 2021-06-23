import { SalesRepository } from './../domain/SalesRepository'
import { UseCaseAsync } from '../../shared/interfaces/UseCase'
import { Sale } from '../domain/Sale'
import { Pizza } from '../../pizza/domain/Pizza'
import { Buyer } from '../../buyer/domain/Buyer'
import { SaleId } from '../domain/SaleId'

interface ICreateSale {
  repository: SalesRepository
}

type CreateSaleParams = {
  pizza: Pizza
  buyer: Buyer
}

export class CreateSale implements UseCaseAsync<CreateSaleParams, Sale> {
  readonly repository: SalesRepository

  constructor({ repository }: ICreateSale) {
    this.repository = repository
  }

  async run({ pizza, buyer }: CreateSaleParams) {
    const id = SaleId.random()
    const sale = await this.repository.add({ id, pizza, buyer })

    return sale
  }
}
