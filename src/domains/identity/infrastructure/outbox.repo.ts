import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  OutboxMessage,
  OutboxRepoInterface,
} from 'src/domains/identity/application/contracts/outbox-repo.interface';
import { DomainEvent } from 'src/shared/domain-event';

@Injectable()
export class OutboxRepo implements OutboxRepoInterface {
  private readonly messages: OutboxMessage[] = [];

  addEvents(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      this.messages.push({
        id: randomUUID(),
        eventName: event.name,
        payload: event.data,
        createdAt: new Date(),
        publishedAt: null,
      });
    }

    return Promise.resolve();
  }

  findUnpublished(): Promise<OutboxMessage[]> {
    return Promise.resolve(
      this.messages.filter((message) => message.publishedAt === null),
    );
  }

  markPublished(ids: string[]): Promise<void> {
    const publishedAt = new Date();

    for (const message of this.messages) {
      if (ids.includes(message.id)) {
        message.publishedAt = publishedAt;
      }
    }

    return Promise.resolve();
  }
}
