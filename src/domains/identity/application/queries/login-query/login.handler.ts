import { LoginQuery } from 'src/domains/identity/application/queries/login-query/login.query';

import { LoginResult } from 'src/domains/identity/application/queries/login-query/login.result';

import { IQueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';

import { EmailVO } from 'src/domains/identity/domain/email.vo';

import {
  CUSTOMER_REPO,
  type CustomerRepoInterface,
} from 'src/domains/identity/application/contracts/customer-repo.interface';

import { QueryHandler } from '@nestjs/cqrs';

import {
  PASSWORD_HASH,
  type PasswordHashInterface,
} from 'src/domains/identity/application/contracts/password-hash.interface';

import { InvalidCredentialsException } from 'src/domains/identity/domain/exceptions/invalid-credentials.exception';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery, LoginResult> {
  constructor(
    @Inject(CUSTOMER_REPO)
    private readonly customerRepo: CustomerRepoInterface,

    @Inject(PASSWORD_HASH)
    private readonly passwordHash: PasswordHashInterface,
  ) {}

  async execute(query: LoginQuery): Promise<LoginResult> {
    const email = EmailVO.create(query.email);

    const customer = await this.customerRepo.findByEmail(email.value);

    if (!customer) {
      throw new InvalidCredentialsException();
    }

    if (
      !(await this.passwordHash.compare(
        query.password,
        customer.getHashedPassword(),
      ))
    ) {
      throw new InvalidCredentialsException();
    }

    return Promise.resolve(
      new LoginResult(
        'Login successful',

        `${customer.getId().value}:${customer.getEmail().value}`,
      ),
    );
  }
}
