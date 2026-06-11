import { DomainEvent } from 'src/shared/domain-event';

export class RideRequestedEvent extends DomainEvent {
  constructor(public readonly rideId: string) {
    super('RideRequested', { rideId });
  }
}
