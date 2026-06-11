import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import {
  AUTH_TOKEN_RESOLVER,
  type AuthTokenResolverInterface,
} from 'src/domains/identity/application/contracts/auth-token-resolver.interface';
import { CUSTOMER_ID_REQUEST_KEY } from 'src/domains/identity/presentation/constants/request-keys';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_TOKEN_RESOLVER)
    private readonly authTokenResolver: AuthTokenResolverInterface,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['x-auth-token'];
    const customerId = this.authTokenResolver.resolveCustomerId(
      typeof token === 'string' ? token : undefined,
    );

    (request as Request & { [CUSTOMER_ID_REQUEST_KEY]: string })[
      CUSTOMER_ID_REQUEST_KEY
    ] = customerId;

    return true;
  }
}
