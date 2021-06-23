export interface UseCase<P, R> {
  run(params?: P): R
}

export interface UseCaseAsync<P, R> {
  run(params?: P): Promise<R>
}
