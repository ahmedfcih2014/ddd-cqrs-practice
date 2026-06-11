import { Global, Module } from '@nestjs/common';
import { OUTBOX_REPO } from 'src/shared/outbox/contracts/outbox-repo.interface';
import { TRANSACTION_MANAGER } from 'src/shared/outbox/contracts/transaction-manager.interface';
import { DomainEventHandlerRegistry } from 'src/shared/outbox/domain-event-handler.registry';
import { InMemoryTransactionManager } from 'src/shared/outbox/in-memory-transaction.manager';
import { OutboxRelayService } from 'src/shared/outbox/outbox-relay.service';
import { OutboxRepo } from 'src/shared/outbox/outbox.repo';

@Global()
@Module({
  providers: [
    OutboxRepo,
    {
      provide: OUTBOX_REPO,
      useExisting: OutboxRepo,
    },
    InMemoryTransactionManager,
    {
      provide: TRANSACTION_MANAGER,
      useExisting: InMemoryTransactionManager,
    },
    DomainEventHandlerRegistry,
    OutboxRelayService,
  ],
  exports: [
    OUTBOX_REPO,
    TRANSACTION_MANAGER,
    DomainEventHandlerRegistry,
    OutboxRelayService,
  ],
})
export class OutboxModule {}
