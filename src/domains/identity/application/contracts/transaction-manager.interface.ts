export const TRANSACTION_MANAGER = Symbol('TRANSACTION_MANAGER');

export interface TransactionManagerInterface {
  runInTransaction<T>(work: () => Promise<T>): Promise<T>;
}
