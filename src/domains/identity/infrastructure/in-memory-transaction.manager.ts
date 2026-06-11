import { Injectable } from '@nestjs/common';
import { TransactionManagerInterface } from 'src/domains/identity/application/contracts/transaction-manager.interface';

@Injectable()
export class InMemoryTransactionManager implements TransactionManagerInterface {
  /**
   * Simulates a database transaction boundary.
   * A real implementation would BEGIN/COMMIT/ROLLBACK against the DB.
   */
  runInTransaction<T>(work: () => Promise<T>): Promise<T> {
    return work();
  }
}
