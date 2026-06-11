import { DomainException } from 'src/shared/domain-exception';

export class InvalidCustomerIdException extends DomainException {
  constructor() {
    super('Invalid customer id');
  }
}
