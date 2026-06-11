import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeactivateCustomerCommand } from 'src/domains/identity/application/commands/deactivate-customer/deactivate-customer.command';
import { DeactivateCustomerResult } from 'src/domains/identity/application/commands/deactivate-customer/deactivate-customer.result';
import {
  CUSTOMER_REPO,
  type CustomerRepoInterface,
} from 'src/domains/identity/application/contracts/customer-repo.interface';
import { CustomerId } from 'src/domains/identity/domain/customer-id.vo';
import { CustomerNotFoundException } from 'src/domains/identity/domain/exceptions/customer-not-found.exception';

@CommandHandler(DeactivateCustomerCommand)
export class DeactivateCustomerHandler implements ICommandHandler<
  DeactivateCustomerCommand,
  DeactivateCustomerResult
> {
  constructor(
    @Inject(CUSTOMER_REPO)
    private readonly customerRepo: CustomerRepoInterface,
  ) {}

  async execute(
    command: DeactivateCustomerCommand,
  ): Promise<DeactivateCustomerResult> {
    const customerId = CustomerId.create(command.customerId);
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new CustomerNotFoundException(command.customerId);
    }

    customer.deactivate();
    await this.customerRepo.save(customer);

    return new DeactivateCustomerResult(
      'Customer deactivated successfully',
      customer.getId().value,
      customer.getStatus(),
    );
  }
}
