import { DomainException } from 'src/shared/domain-exception';

export class InvalidEmailException extends DomainException {
  constructor() {
    super('Invalid email');
  }
}
