import { DomainException } from 'src/shared/domain-exception';

export class DuplicateEmailException extends DomainException {
  constructor(email: string) {
    super(`Customer with email ${email} already exists`);
  }
}
