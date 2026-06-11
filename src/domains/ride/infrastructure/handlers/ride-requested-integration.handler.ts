import { Injectable, Logger } from '@nestjs/common';
import { DomainEvent } from 'src/shared/domain-event';
import { DomainEventHandlerRegistry } from 'src/shared/outbox/domain-event-handler.registry';
import { IntegrationEventHandler } from 'src/shared/outbox/integration-event-handler.base';

@Injectable()
export class RideRequestedIntegrationHandler extends IntegrationEventHandler {
  private readonly logger = new Logger(RideRequestedIntegrationHandler.name);

  constructor(handlerRegistry: DomainEventHandlerRegistry) {
    super(handlerRegistry);
  }

  supports(eventName: string): boolean {
    return eventName === 'RideRequested';
  }

  handle(event: DomainEvent): Promise<void> {
    this.logger.log(
      `Publishing integration event: ${event.name} ${JSON.stringify(event.data)}`,
    );
    return Promise.resolve();
  }
}
