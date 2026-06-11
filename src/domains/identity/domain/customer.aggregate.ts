import { CustomerActivatedEvent } from 'src/domains/identity/domain/customer-activated.event';

import { CustomerDeactivatedEvent } from 'src/domains/identity/domain/customer-deactivated.event';

import { CustomerRegisteredEvent } from 'src/domains/identity/domain/customer-registered.event';

import { CustomerId } from 'src/domains/identity/domain/customer-id.vo';

import { CustomerStatus } from 'src/domains/identity/domain/customer-status.enum';

import { CustomerAlreadyActiveException } from 'src/domains/identity/domain/exceptions/customer-already-active.exception';

import { CustomerAlreadyInactiveException } from 'src/domains/identity/domain/exceptions/customer-already-inactive.exception';

import { EmailVO } from 'src/domains/identity/domain/email.vo';

import { NameVO } from 'src/domains/identity/domain/name.vo';

import { AggregateRoot } from 'src/shared/aggregate-root';

export class Customer extends AggregateRoot {
  private readonly id: CustomerId;

  private status: CustomerStatus;

  public readonly email: EmailVO;

  private name: NameVO;

  private hashedPassword: string;

  private constructor(
    id: CustomerId,

    name: NameVO,

    email: EmailVO,

    hashedPassword: string,

    status: CustomerStatus,
  ) {
    super();

    this.id = id;

    this.email = email;

    this.name = name;

    this.status = status;

    this.hashedPassword = hashedPassword;
  }

  public static register(
    id: CustomerId,

    name: NameVO,

    email: EmailVO,

    hashedPassword: string,
  ): Customer {
    const customer = new Customer(
      id,

      name,

      email,

      hashedPassword,

      CustomerStatus.INACTIVE,
    );

    customer.addDomainEvent(new CustomerRegisteredEvent(id.value, email.value));

    return customer;
  }

  public getId(): CustomerId {
    return this.id;
  }

  public isActive(): boolean {
    return this.status === CustomerStatus.ACTIVE;
  }

  public activate(): void {
    if (this.isActive()) {
      throw new CustomerAlreadyActiveException();
    }

    this.status = CustomerStatus.ACTIVE;

    this.addDomainEvent(new CustomerActivatedEvent(this.id.value));
  }

  public deactivate(): void {
    if (!this.isActive()) {
      throw new CustomerAlreadyInactiveException();
    }

    this.status = CustomerStatus.INACTIVE;

    this.addDomainEvent(new CustomerDeactivatedEvent(this.id.value));
  }

  public getName(): NameVO {
    return this.name;
  }

  public getEmail(): EmailVO {
    return this.email;
  }

  public getStatus(): CustomerStatus {
    return this.status;
  }

  public getHashedPassword(): string {
    return this.hashedPassword;
  }
}
