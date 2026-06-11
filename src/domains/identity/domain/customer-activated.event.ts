import { DomainEvent } from 'src/shared/domain-event';

export class CustomerActivatedEvent extends DomainEvent {
  constructor(public readonly customerId: string) {
    super('CustomerActivated', { customerId });
  }
}
