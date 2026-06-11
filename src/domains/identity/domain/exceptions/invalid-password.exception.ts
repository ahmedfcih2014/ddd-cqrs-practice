import { DomainException } from 'src/shared/domain-exception';

export class InvalidPasswordException extends DomainException {
  constructor() {
    super('Password must be at least 6 characters');
  }
}
