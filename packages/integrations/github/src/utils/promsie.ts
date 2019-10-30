/*export type Resolvable<Type> = {
  promise: Promise<Type>
  resolve: (p: Type | PromiseLike<Type>) => void;
  reject: (reason: any) => void;
}*/

type Resolvable<Type> = Promise<Type> & {
  resolve: (result: Type | PromiseLike<Type>) => void;
  reject: (reason?: any) => void;
}

export const createResolvable = <T>() => {
  let resolveA: (result: T | PromiseLike<T>) => void = {} as any;
  let rejectA: (reason?: any) => void = {} as any;
  const result: Resolvable<T> = new Promise((resolve, reject) => {
    resolveA = resolve;
    rejectA = reject;
  }) as any;
  result.resolve = resolveA;
  result.reject = rejectA;

  return result;
};