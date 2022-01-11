import { ActionContext } from 'vuex'

export interface IIndexArrayFn<T> {
  (row:T) : string;
}

export interface IDictionary<T> {
  [Key: string]: T;
}

export function indexArray<T> (array:Array<IDictionary<any>>, key:string|IIndexArrayFn<any>): IDictionary<T> {
  if (!array) {
    return {}
  }
  return array.reduce((cumm, r) => {
    const keyVal = typeof key === 'function' ? key(r) : r[key]
    cumm[keyVal] = r
    return cumm
  }, {})
}

interface IAsyncRequestCallable<T> { 
  (): Promise<T>
}

export async function asyncPromise<T> (context: ActionContext<ThisType<any>, any>, promise: Promise<T>): Promise<T> {
  context.commit('setLoading', true)
  try {
    return await promise
  } catch (error) {
    context.commit('setError', error)
    throw error
  } finally {
    context.commit('setLoading', false)
  }
}

export async function asyncRequest<T> (context: ActionContext<ThisType<any>, any>, callable: IAsyncRequestCallable<T>): Promise<T> {
  return asyncPromise(context, callable())
}
