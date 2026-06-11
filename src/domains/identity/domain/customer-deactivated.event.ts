import { DomainEvent } from 'src/shared/domain-event';

export class CustomerDeactivatedEvent extends DomainEvent {
  constructor(public readonly customerId: string) {
    super('CustomerDeactivated', { customerId });
  }
}
