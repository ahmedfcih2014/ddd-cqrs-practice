import { IQueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';

import {
  CUSTOMER_REPO,
  type CustomerRepoInterface,
} from 'src/domains/identity/application/contracts/customer-repo.interface';

import { QueryHandler } from '@nestjs/cqrs';

import { ProfileQuery } from 'src/domains/identity/application/queries/profile-query/profile.query';

import { ProfileResult } from 'src/domains/identity/application/queries/profile-query/profile.result';

import { CustomerId } from 'src/domains/identity/domain/customer-id.vo';
import { CustomerNotFoundException } from 'src/domains/identity/domain/exceptions/customer-not-found.exception';

@QueryHandler(ProfileQuery)
export class ProfileHandler implements IQueryHandler<
  ProfileQuery,
  ProfileResult
> {
  constructor(
    @Inject(CUSTOMER_REPO)
    private readonly customerRepo: CustomerRepoInterface,
  ) {}

  async execute(query: ProfileQuery): Promise<ProfileResult> {
    const customerId = CustomerId.create(query.customerId);
    const customer = await this.customerRepo.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundException(query.customerId);
    }

    return Promise.resolve(
      new ProfileResult(
        customer.getId().value,
        customer.getName().value,
        customer.getEmail().value,
        customer.getStatus(),
      ),
    );
  }
}
