import { InvalidPasswordException } from 'src/domains/identity/domain/exceptions/invalid-password.exception';

export class PasswordVO {
  constructor(public readonly value: string) {
    if (!this.isValid()) {
      throw new InvalidPasswordException();
    }
  }

  private isValid(): boolean {
    return this.value.length >= 6;
  }
}
