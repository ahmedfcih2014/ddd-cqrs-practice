import { DomainEvent } from 'src/shared/domain-event';

export interface DomainEventHandler {
  supports(eventName: string): boolean;
  handle(event: DomainEvent): Promise<void>;
}
