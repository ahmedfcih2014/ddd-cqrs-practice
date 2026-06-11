import { DomainEvent } from 'src/shared/domain-event';

export class RideConfirmedEvent extends DomainEvent {
  constructor(public readonly rideId: string) {
    super('RideConfirmed', { rideId });
  }
}
