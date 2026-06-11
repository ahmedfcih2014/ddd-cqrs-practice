import { InvalidNameException } from 'src/domains/identity/domain/exceptions/invalid-name.exception';

export class NameVO {
  constructor(public readonly value: string) {
    if (!NameVO.isValid(value)) {
      throw new InvalidNameException();
    }
  }

  public static create(value: string): NameVO {
    return new NameVO(value.trim());
  }

  private static isValid(value: string): boolean {
    const trimmed = value.trim();
    return trimmed.length >= 3 && trimmed.length <= 255;
  }
}
