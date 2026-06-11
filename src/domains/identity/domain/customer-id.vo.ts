import { randomUUID } from 'node:crypto';
import { IdVO } from 'src/shared/id.vo';

export class CustomerId extends IdVO {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): CustomerId {
    return new CustomerId(value);
  }

  public static generate(): CustomerId {
    return new CustomerId(randomUUID());
  }
}
