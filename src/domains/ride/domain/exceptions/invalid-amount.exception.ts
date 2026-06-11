import { DomainException } from 'src/shared/domain-exception';

export class InvalidAmountException extends DomainException {
  constructor() {
    super('Invalid amount, must be a positive number');
  }
}
