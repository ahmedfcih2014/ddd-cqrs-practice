import { randomUUID } from 'node:crypto';
import { IdVO } from 'src/shared/id.vo';

export class RideIdVO extends IdVO {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): RideIdVO {
    return new RideIdVO(value);
  }

  public static generate(): RideIdVO {
    return new RideIdVO(randomUUID());
  }
}
