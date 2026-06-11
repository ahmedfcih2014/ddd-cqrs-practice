import { DomainEvent } from './domain-event';

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = [];

  public getDomainEvents(): DomainEvent[] {
    return [...this.domainEvents];
  }

  public clearDomainEvents(): void {
    this.domainEvents = [];
  }

  public addDomainEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  public pullDomainEvent(): DomainEvent | undefined {
    if (this.domainEvents.length === 0) {
      return undefined;
    }
    const domainEvent = this.domainEvents.shift();
    return domainEvent ?? undefined;
  }
}
