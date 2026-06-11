import { Injectable, Logger } from '@nestjs/common';
import { DomainEventHandler } from 'src/domains/identity/application/contracts/domain-event-handler.interface';
import { DomainEvent } from 'src/shared/domain-event';

@Injectable()
export class CustomerRegisteredIntegrationHandler implements DomainEventHandler {
  private readonly logger = new Logger(
    CustomerRegisteredIntegrationHandler.name,
  );

  supports(eventName: string): boolean {
    return eventName === 'CustomerRegistered';
  }

  handle(event: DomainEvent): Promise<void> {
    this.logger.log(
      `Publishing integration event: ${event.name} ${JSON.stringify(event.data)}`,
    );
    return Promise.resolve();
  }
}
