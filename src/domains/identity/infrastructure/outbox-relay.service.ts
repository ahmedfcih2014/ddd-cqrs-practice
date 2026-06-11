import { Inject, Injectable } from '@nestjs/common';
import {
  OUTBOX_REPO,
  type OutboxRepoInterface,
} from 'src/domains/identity/application/contracts/outbox-repo.interface';
import { DomainEventHandler } from 'src/domains/identity/application/contracts/domain-event-handler.interface';
import { DomainEvent } from 'src/shared/domain-event';
import { CustomerActivatedIntegrationHandler } from 'src/domains/identity/infrastructure/handlers/customer-activated-integration.handler';
import { CustomerDeactivatedIntegrationHandler } from 'src/domains/identity/infrastructure/handlers/customer-deactivated-integration.handler';
import { CustomerRegisteredIntegrationHandler } from 'src/domains/identity/infrastructure/handlers/customer-registered-integration.handler';

@Injectable()
export class OutboxRelayService {
  private readonly handlers: DomainEventHandler[];

  constructor(
    @Inject(OUTBOX_REPO)
    private readonly outboxRepo: OutboxRepoInterface,
    customerRegisteredHandler: CustomerRegisteredIntegrationHandler,
    customerActivatedHandler: CustomerActivatedIntegrationHandler,
    customerDeactivatedHandler: CustomerDeactivatedIntegrationHandler,
  ) {
    this.handlers = [
      customerRegisteredHandler,
      customerActivatedHandler,
      customerDeactivatedHandler,
    ];
  }

  async publishPending(): Promise<void> {
    const messages = await this.outboxRepo.findUnpublished();
    if (messages.length === 0) {
      return;
    }

    const publishedIds: string[] = [];

    for (const message of messages) {
      const event = DomainEvent.fromPrimitives(
        message.eventName,
        message.payload,
      );

      for (const handler of this.handlers) {
        if (handler.supports(message.eventName)) {
          await handler.handle(event);
        }
      }

      publishedIds.push(message.id);
    }

    await this.outboxRepo.markPublished(publishedIds);
  }
}
