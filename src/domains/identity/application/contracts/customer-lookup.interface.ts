import { CustomerReference } from 'src/domains/identity/application/read-models/customer-reference.read-model';
import { CustomerId } from 'src/domains/identity/domain/customer-id.vo';

export const CUSTOMER_LOOKUP = Symbol('CUSTOMER_LOOKUP');

export interface CustomerLookupInterface {
  findById(id: CustomerId): Promise<CustomerReference | null>;
}
