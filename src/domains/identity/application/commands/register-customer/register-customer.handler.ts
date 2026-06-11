import { Inject } from '@nestjs/common';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RegisterCustomerCommand } from 'src/domains/identity/application/commands/register-customer/register-customer.command';

import { RegisterCustomerResult } from 'src/domains/identity/application/commands/register-customer/register-customer.result';

import { Customer } from 'src/domains/identity/domain/customer.aggregate';

import { DuplicateEmailException } from 'src/domains/identity/domain/exceptions/duplicate-email.exception';

import { CustomerId } from 'src/domains/identity/domain/customer-id.vo';
import { EmailVO } from 'src/domains/identity/domain/email.vo';
import { NameVO } from 'src/domains/identity/domain/name.vo';

import {
  CUSTOMER_REPO,
  type CustomerRepoInterface,
} from 'src/domains/identity/application/contracts/customer-repo.interface';

import { PasswordVO } from 'src/domains/identity/domain/password.vo';

import {
  PASSWORD_HASH,
  type PasswordHashInterface,
} from 'src/domains/identity/application/contracts/password-hash.interface';

@CommandHandler(RegisterCustomerCommand)
export class RegisterCustomerHandler implements ICommandHandler<
  RegisterCustomerCommand,
  RegisterCustomerResult
> {
  constructor(
    @Inject(CUSTOMER_REPO)
    private readonly customerRepo: CustomerRepoInterface,

    @Inject(PASSWORD_HASH)
    private readonly passwordHash: PasswordHashInterface,
  ) {}

  async execute(
    command: RegisterCustomerCommand,
  ): Promise<RegisterCustomerResult> {
    const email = EmailVO.create(command.email);
    const name = NameVO.create(command.name);
    const password = new PasswordVO(command.password);

    const existingCustomer = await this.customerRepo.findByEmail(email.value);

    if (existingCustomer) {
      throw new DuplicateEmailException(email.value);
    }

    const hashedPassword = await this.passwordHash.hash(password.value);

    const customer = Customer.register(
      CustomerId.generate(),
      name,
      email,
      hashedPassword,
    );

    customer.activate();

    const id = await this.customerRepo.save(customer);

    return Promise.resolve(
      new RegisterCustomerResult('Customer registered successfully', id),
    );
  }
}
