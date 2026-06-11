import { DomainException } from 'src/shared/domain-exception';

export class RideNotPendingException extends DomainException {
  constructor() {
    super('Ride is not pending, can`t transition its status');
  }
}
