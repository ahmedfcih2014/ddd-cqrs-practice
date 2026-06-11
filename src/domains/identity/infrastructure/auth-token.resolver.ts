import { Injectable } from '@nestjs/common';
import { AuthTokenResolverInterface } from 'src/domains/identity/application/contracts/auth-token-resolver.interface';
import { CustomerId } from 'src/domains/identity/domain/customer-id.vo';
import { UnauthenticatedException } from 'src/domains/identity/domain/exceptions/unauthenticated.exception';

@Injectable()
export class AuthTokenResolver implements AuthTokenResolverInterface {
  resolveCustomerId(token: string | undefined): string {
    if (!token) {
      throw new UnauthenticatedException();
    }

    const [customerId] = token.split(':');

    if (!customerId) {
      throw new UnauthenticatedException();
    }

    return CustomerId.create(customerId).value;
  }
}
