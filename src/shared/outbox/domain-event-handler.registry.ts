import { Injectable } from '@nestjs/common';
import { DomainEventHandler } from 'src/shared/outbox/contracts/domain-event-handler.interface';

@Injectable()
export class DomainEventHandlerRegistry {
  private readonly handlers: DomainEventHandler[] = [];

  register(handler: DomainEventHandler): void {
    this.handlers.push(handler);
  }

  getHandlers(): DomainEventHandler[] {
    return this.handlers;
  }
}
