import { Injectable, Logger } from '@nestjs/common';
import { DomainEventHandler } from 'src/domains/ride/application/contracts/domain-event-handler.interface';
import { DomainEvent } from 'src/shared/domain-event';

@Injectable()
export class RideRequestedIntegrationHandler implements DomainEventHandler {
  private readonly logger = new Logger(RideRequestedIntegrationHandler.name);

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
