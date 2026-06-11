import { DomainException } from 'src/shared/domain-exception';

export class InvalidCredentialsException extends DomainException {
  constructor() {
    super('Invalid credentials');
  }
}
