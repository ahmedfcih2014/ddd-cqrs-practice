import { DomainEvent } from 'src/shared/domain-event';

export class RideCancelledEvent extends DomainEvent {
  constructor(public readonly rideId: string) {
    super('RideCancelled', { rideId });
  }
}
