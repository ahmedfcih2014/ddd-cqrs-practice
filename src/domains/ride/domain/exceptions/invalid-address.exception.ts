import { DomainException } from 'src/shared/domain-exception';

export class InvalidAddressException extends DomainException {
  constructor() {
    super('Invalid address, must be between 3 and 200 characters');
  }
}
