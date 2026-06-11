import { InvalidCurrencyException } from 'src/domains/ride/domain/exceptions/invalid-currency.exception';

export class CurrencyVO {
  private constructor(public readonly value: string) {}

  public static isValid(value: string): boolean {
    return ['GBP', 'USD', 'EUR'].includes(value);
  }

  public static create(value: string): CurrencyVO {
    if (!this.isValid(value)) {
      throw new InvalidCurrencyException();
    }
    return new CurrencyVO(value);
  }
}
