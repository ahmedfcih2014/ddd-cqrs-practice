import { DomainException } from 'src/shared/domain-exception';

export class CustomerAlreadyInactiveException extends DomainException {
  constructor() {
    super('Customer is already inactive');
  }
}
