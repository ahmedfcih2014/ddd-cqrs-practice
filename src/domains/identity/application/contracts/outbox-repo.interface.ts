import { DomainEvent } from 'src/shared/domain-event';

export const OUTBOX_REPO = Symbol('OUTBOX_REPO');

export interface OutboxMessage {
  readonly id: string;
  readonly eventName: string;
  readonly payload: Record<string, unknown>;
  readonly createdAt: Date;
  publishedAt: Date | null;
}

export interface OutboxRepoInterface {
  addEvents(events: DomainEvent[]): Promise<void>;
  findUnpublished(): Promise<OutboxMessage[]>;
  markPublished(ids: string[]): Promise<void>;
}
