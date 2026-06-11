import { Inject, Injectable } from '@nestjs/common';
import {
  OUTBOX_REPO,
  type OutboxRepoInterface,
} from 'src/shared/outbox/contracts/outbox-repo.interface';
import { DomainEventHandlerRegistry } from 'src/shared/outbox/domain-event-handler.registry';
import { DomainEvent } from 'src/shared/domain-event';

@Injectable()
export class OutboxRelayService {
  constructor(
    @Inject(OUTBOX_REPO)
    private readonly outboxRepo: OutboxRepoInterface,
    private readonly handlerRegistry: DomainEventHandlerRegistry,
  ) {}

  async publishPending(): Promise<void> {
    const messages = await this.outboxRepo.findUnpublished();
    if (messages.length === 0) {
      return;
    }

    const handlers = this.handlerRegistry.getHandlers();
    const publishedIds: string[] = [];

    for (const message of messages) {
      const event = DomainEvent.fromPrimitives(
        message.eventName,
        message.payload,
      );

      for (const handler of handlers) {
        if (handler.supports(message.eventName)) {
          await handler.handle(event);
        }
      }

      publishedIds.push(message.id);
    }

    await this.outboxRepo.markPublished(publishedIds);
  }
}
