import { DomainException } from 'src/shared/domain-exception';

export class UnauthenticatedException extends DomainException {
  constructor() {
    super('Unauthorized');
  }
}
