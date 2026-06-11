import { Injectable, Logger } from '@nestjs/common';
import { DomainEventHandler } from 'src/domains/ride/application/contracts/domain-event-handler.interface';
import { DomainEvent } from 'src/shared/domain-event';

@Injectable()
export class RideCancelledIntegrationHandler implements DomainEventHandler {
  private readonly logger = new Logger(RideCancelledIntegrationHandler.name);

  supports(eventName: string): boolean {
    return eventName === 'RideCancelled';
  }

  handle(event: DomainEvent): Promise<void> {
    this.logger.log(
      `Publishing integration event: ${event.name} ${JSON.stringify(event.data)}`,
    );
    return Promise.resolve();
  }
}
