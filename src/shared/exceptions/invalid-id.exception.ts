import { DomainException } from 'src/shared/domain-exception';

export class InvalidIdException extends DomainException {
  constructor() {
    super('Invalid id');
  }
}
