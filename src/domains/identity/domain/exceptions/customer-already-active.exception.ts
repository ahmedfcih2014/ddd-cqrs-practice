import { DomainException } from 'src/shared/domain-exception';

export class CustomerAlreadyActiveException extends DomainException {
  constructor() {
    super('Customer is already active');
  }
}
