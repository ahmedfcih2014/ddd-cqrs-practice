import { CurrencyVO } from 'src/domains/ride/domain/currency.vo';
import { InvalidAmountException } from 'src/domains/ride/domain/exceptions/invalid-amount.exception';

export class MoneyVO {
  private constructor(
    public readonly amount: number,
    public readonly currency: CurrencyVO,
  ) {}

  public static create(amount: number, currency: CurrencyVO): MoneyVO {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new InvalidAmountException();
    }
    return new MoneyVO(amount, currency);
  }
}
