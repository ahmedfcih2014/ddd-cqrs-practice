import { DomainException } from 'src/shared/domain-exception';

export class InvalidLongitudeException extends DomainException {
  constructor() {
    super('Invalid longitude, must be between -180 to 180');
  }
}
