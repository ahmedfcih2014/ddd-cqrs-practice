import { CustomerStatus } from 'src/domains/identity/domain/customer-status.enum';

export class ProfileResult {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly status: CustomerStatus,
  ) {}
}
