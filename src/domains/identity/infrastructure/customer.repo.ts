import { Inject, Injectable } from '@nestjs/common';

import { Customer } from 'src/domains/identity/domain/customer.aggregate';
import { CustomerId } from 'src/domains/identity/domain/customer-id.vo';

import { CustomerRepoInterface } from 'src/domains/identity/application/contracts/customer-repo.interface';

import {
  OUTBOX_REPO,
  type OutboxRepoInterface,
} from 'src/shared/outbox/contracts/outbox-repo.interface';

import {
  TRANSACTION_MANAGER,
  type TransactionManagerInterface,
} from 'src/shared/outbox/contracts/transaction-manager.interface';

import { OutboxRelayService } from 'src/shared/outbox/outbox-relay.service';

@Injectable()
export class CustomerRepo implements CustomerRepoInterface {
  private readonly customersById = new Map<string, Customer>();

  private readonly idByEmail = new Map<string, string>();

  constructor(
    @Inject(OUTBOX_REPO)
    private readonly outboxRepo: OutboxRepoInterface,

    @Inject(TRANSACTION_MANAGER)
    private readonly transactionManager: TransactionManagerInterface,

    private readonly outboxRelay: OutboxRelayService,
  ) {}

  async save(customer: Customer): Promise<string> {
    const id = customer.getId().value;
    const email = customer.email.value;
    const domainEvents = customer.getDomainEvents();
    const isUpdate = this.customersById.has(id);

    await this.transactionManager.runInTransaction(async () => {
      this.customersById.set(id, customer);

      if (!isUpdate) {
        this.idByEmail.set(email, id);
      }

      await this.outboxRepo.addEvents(domainEvents);
    });

    customer.clearDomainEvents();

    await this.outboxRelay.publishPending();

    return id;
  }

  public findByEmail(email: string): Promise<Customer | null> {
    const id = this.idByEmail.get(email.toLowerCase());

    if (!id) {
      return Promise.resolve(null);
    }

    return Promise.resolve(this.customersById.get(id) ?? null);
  }

  public findById(id: CustomerId): Promise<Customer | null> {
    return Promise.resolve(this.customersById.get(id.value) ?? null);
  }
}
