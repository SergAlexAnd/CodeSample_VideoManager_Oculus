export interface ActionCreator<T, P> {
  type: T;
  payload: P;
}
