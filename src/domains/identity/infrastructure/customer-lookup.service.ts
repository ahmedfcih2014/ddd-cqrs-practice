import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_REPO,
  type CustomerRepoInterface,
} from 'src/domains/identity/application/contracts/customer-repo.interface';
import { CustomerLookupInterface } from 'src/domains/identity/application/contracts/customer-lookup.interface';
import { CustomerReference } from 'src/domains/identity/application/read-models/customer-reference.read-model';
import { CustomerId } from 'src/domains/identity/domain/customer-id.vo';

@Injectable()
export class CustomerLookupService implements CustomerLookupInterface {
  constructor(
    @Inject(CUSTOMER_REPO)
    private readonly customerRepo: CustomerRepoInterface,
  ) {}

  async findById(id: CustomerId): Promise<CustomerReference | null> {
    const customer = await this.customerRepo.findById(id);
    if (!customer) {
      return null;
    }

    return new CustomerReference(
      customer.getId().value,
      customer.getEmail().value,
      customer.getStatus(),
      customer.isActive(),
    );
  }
}
