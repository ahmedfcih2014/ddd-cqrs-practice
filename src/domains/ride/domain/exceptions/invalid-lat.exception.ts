import { DomainException } from 'src/shared/domain-exception';

export class InvalidLatitudeException extends DomainException {
  constructor() {
    super('Invalid latitude, must be between -90 to 90');
  }
}
