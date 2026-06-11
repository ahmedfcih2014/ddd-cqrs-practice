import { randomUUID } from 'node:crypto';
import { InvalidCustomerIdException } from 'src/domains/identity/domain/exceptions/invalid-customer-id.exception';

export class CustomerId {
  constructor(public readonly value: string) {
    if (!CustomerId.isValid(value)) {
      throw new InvalidCustomerIdException();
    }
  }

  public static create(value: string): CustomerId {
    return new CustomerId(value);
  }

  public static generate(): CustomerId {
    return new CustomerId(randomUUID());
  }

  private static isValid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    );
  }
}
