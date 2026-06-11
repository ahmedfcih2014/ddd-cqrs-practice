import { Customer } from 'src/domains/identity/domain/customer.aggregate';
import { CustomerId } from 'src/domains/identity/domain/customer-id.vo';

export const CUSTOMER_REPO = Symbol('CUSTOMER_REPO');

export interface CustomerRepoInterface {
  save(customer: Customer): Promise<string>;
  findByEmail(email: string): Promise<Customer | null>;
  findById(id: CustomerId): Promise<Customer | null>;
}
