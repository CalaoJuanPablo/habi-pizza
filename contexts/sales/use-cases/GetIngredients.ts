import { Ingredient } from '../ingredient/Ingredient';
import { UseCaseAsync } from './../../shared/interfaces/UseCase';

export class GetIngredients implements UseCaseAsync<null, Ingredient[]> {
  readonly repository = 
  async run() {}
}