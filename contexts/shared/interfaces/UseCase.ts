export interface UseCaseAsync<P, R> {
  run(params?: P): Promise<R>
}
