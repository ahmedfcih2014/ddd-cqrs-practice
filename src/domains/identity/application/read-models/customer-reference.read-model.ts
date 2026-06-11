import { CustomerStatus } from 'src/domains/identity/domain/customer-status.enum';

export class CustomerReference {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly status: CustomerStatus,
    public readonly isActive: boolean,
  ) {}
}
