import { OnModuleInit } from '@nestjs/common';
import { DomainEvent } from 'src/shared/domain-event';
import { DomainEventHandler } from 'src/shared/outbox/contracts/domain-event-handler.interface';
import { DomainEventHandlerRegistry } from 'src/shared/outbox/domain-event-handler.registry';

export abstract class IntegrationEventHandler
  implements DomainEventHandler, OnModuleInit
{
  constructor(protected readonly handlerRegistry: DomainEventHandlerRegistry) {}

  onModuleInit(): void {
    this.handlerRegistry.register(this);
  }

  abstract supports(eventName: string): boolean;
  abstract handle(event: DomainEvent): Promise<void>;
}
