import { UseCaseAsync } from '../../shared/interfaces/UseCase'
import { Sale } from '../domain/Sale'
import { SalesRepository } from './../domain/SalesRepository'

interface IGetAllSales {
  repository: SalesRepository
}

export class GetAllSales implements UseCaseAsync<null, Array<Sale>> {
  readonly repository: SalesRepository

  constructor({ repository }: IGetAllSales) {
    this.repository = repository
  }

  async run() {
    const sales = this.repository.findAll()

    return sales
  }
}
