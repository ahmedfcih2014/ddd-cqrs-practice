import { InvalidIdException } from 'src/shared/exceptions/invalid-id.exception';

export class IdVO {
  protected constructor(public readonly value: string) {
    if (!IdVO.isValid(value)) {
      throw new InvalidIdException();
    }
  }

  private static isValid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    );
  }
}
