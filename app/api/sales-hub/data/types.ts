// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomActionFn<T = any> = (payload: T) => Promise<unknown>;
