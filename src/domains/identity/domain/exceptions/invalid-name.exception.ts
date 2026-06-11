import { DomainException } from 'src/shared/domain-exception';

export class InvalidNameException extends DomainException {
  constructor() {
    super('Name must be between 3 and 255 characters');
  }
}
