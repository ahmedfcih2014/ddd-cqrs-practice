import { DomainEvent } from 'src/shared/domain-event';

export class CustomerRegisteredEvent extends DomainEvent {
  constructor(
    public readonly customerId: string,
    public readonly customerEmail: string,
  ) {
    super('CustomerRegistered', {
      customerId,
      customerEmail,
    });
  }
}
