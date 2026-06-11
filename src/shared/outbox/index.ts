export {
  OUTBOX_REPO,
  type OutboxRepoInterface,
  type OutboxMessage,
} from 'src/shared/outbox/contracts/outbox-repo.interface';
export {
  TRANSACTION_MANAGER,
  type TransactionManagerInterface,
} from 'src/shared/outbox/contracts/transaction-manager.interface';
export { type DomainEventHandler } from 'src/shared/outbox/contracts/domain-event-handler.interface';
export { DomainEventHandlerRegistry } from 'src/shared/outbox/domain-event-handler.registry';
export { IntegrationEventHandler } from 'src/shared/outbox/integration-event-handler.base';
export { OutboxRelayService } from 'src/shared/outbox/outbox-relay.service';
export { OutboxModule } from 'src/shared/outbox/outbox.module';
