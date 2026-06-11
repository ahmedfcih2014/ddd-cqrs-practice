import { CustomerStatus } from 'src/domains/identity/domain/customer-status.enum';

export class ActivateCustomerResult {
  constructor(
    public readonly message: string,
    public readonly customerId: string,
    public readonly status: CustomerStatus,
  ) {}
}
