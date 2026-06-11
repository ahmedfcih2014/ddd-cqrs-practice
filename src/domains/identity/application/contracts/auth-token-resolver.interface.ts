export const AUTH_TOKEN_RESOLVER = Symbol('AUTH_TOKEN_RESOLVER');

export interface AuthTokenResolverInterface {
  resolveCustomerId(token: string | undefined): string;
}
