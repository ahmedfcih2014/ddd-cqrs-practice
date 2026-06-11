import { DomainException } from 'src/shared/domain-exception';

export class InvalidCurrencyException extends DomainException {
  constructor() {
    super('Invalid currency');
  }
}
