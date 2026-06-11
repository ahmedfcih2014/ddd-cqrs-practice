import { CustomerStatus } from 'src/domains/identity/domain/customer-status.enum';

export class DeactivateCustomerResult {
  constructor(
    public readonly message: string,
    public readonly customerId: string,
    public readonly status: CustomerStatus,
  ) {}
}
