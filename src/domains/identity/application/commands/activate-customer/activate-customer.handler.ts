import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActivateCustomerCommand } from 'src/domains/identity/application/commands/activate-customer/activate-customer.command';
import { ActivateCustomerResult } from 'src/domains/identity/application/commands/activate-customer/activate-customer.result';
import {
  CUSTOMER_REPO,
  type CustomerRepoInterface,
} from 'src/domains/identity/application/contracts/customer-repo.interface';
import { CustomerId } from 'src/domains/identity/domain/customer-id.vo';
import { CustomerNotFoundException } from 'src/domains/identity/domain/exceptions/customer-not-found.exception';

@CommandHandler(ActivateCustomerCommand)
export class ActivateCustomerHandler implements ICommandHandler<
  ActivateCustomerCommand,
  ActivateCustomerResult
> {
  constructor(
    @Inject(CUSTOMER_REPO)
    private readonly customerRepo: CustomerRepoInterface,
  ) {}

  async execute(
    command: ActivateCustomerCommand,
  ): Promise<ActivateCustomerResult> {
    const customerId = CustomerId.create(command.customerId);
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new CustomerNotFoundException(command.customerId);
    }

    customer.activate();
    await this.customerRepo.save(customer);

    return new ActivateCustomerResult(
      'Customer activated successfully',
      customer.getId().value,
      customer.getStatus(),
    );
  }
}
