import { InvalidEmailException } from 'src/domains/identity/domain/exceptions/invalid-email.exception';

export class EmailVO {
  constructor(public readonly value: string) {
    if (!this.isValid()) {
      throw new InvalidEmailException();
    }
  }

  public static create(value: string): EmailVO {
    return new EmailVO(value.toLowerCase());
  }

  private isValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.toLowerCase());
  }
}
