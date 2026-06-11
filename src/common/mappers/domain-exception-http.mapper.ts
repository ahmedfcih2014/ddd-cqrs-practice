import { HttpStatus } from '@nestjs/common';
import { CustomerAlreadyActiveException } from 'src/domains/identity/domain/exceptions/customer-already-active.exception';
import { CustomerAlreadyInactiveException } from 'src/domains/identity/domain/exceptions/customer-already-inactive.exception';
import { CustomerNotFoundException } from 'src/domains/identity/domain/exceptions/customer-not-found.exception';
import { DuplicateEmailException } from 'src/domains/identity/domain/exceptions/duplicate-email.exception';
import { InvalidCredentialsException } from 'src/domains/identity/domain/exceptions/invalid-credentials.exception';
import { InvalidCustomerIdException } from 'src/domains/identity/domain/exceptions/invalid-customer-id.exception';
import { InvalidEmailException } from 'src/domains/identity/domain/exceptions/invalid-email.exception';
import { InvalidNameException } from 'src/domains/identity/domain/exceptions/invalid-name.exception';
import { InvalidPasswordException } from 'src/domains/identity/domain/exceptions/invalid-password.exception';
import { UnauthenticatedException } from 'src/domains/identity/domain/exceptions/unauthenticated.exception';
import { InvalidAddressException } from 'src/domains/ride/domain/exceptions/invalid-address.exception';
import { InvalidAmountException } from 'src/domains/ride/domain/exceptions/invalid-amount.exception';
import { InvalidCurrencyException } from 'src/domains/ride/domain/exceptions/invalid-currency.exception';
import { InvalidLatitudeException } from 'src/domains/ride/domain/exceptions/invalid-lat.exception';
import { InvalidLongitudeException } from 'src/domains/ride/domain/exceptions/invalid-lng.exception';
import { RideNotPendingException } from 'src/domains/ride/domain/exceptions/ride-not-pending.exception';
import { DomainException } from 'src/shared/domain-exception';

const DOMAIN_EXCEPTION_HTTP_STATUS = new Map<
  abstract new (...args: never[]) => DomainException,
  HttpStatus
>([
  [DuplicateEmailException, HttpStatus.CONFLICT],
  [CustomerNotFoundException, HttpStatus.NOT_FOUND],
  [InvalidCredentialsException, HttpStatus.UNAUTHORIZED],
  [UnauthenticatedException, HttpStatus.UNAUTHORIZED],
  [InvalidEmailException, HttpStatus.BAD_REQUEST],
  [InvalidPasswordException, HttpStatus.BAD_REQUEST],
  [InvalidNameException, HttpStatus.BAD_REQUEST],
  [InvalidCustomerIdException, HttpStatus.BAD_REQUEST],
  [CustomerAlreadyActiveException, HttpStatus.BAD_REQUEST],
  [CustomerAlreadyInactiveException, HttpStatus.BAD_REQUEST],
  [InvalidAddressException, HttpStatus.BAD_REQUEST],
  [InvalidLatitudeException, HttpStatus.BAD_REQUEST],
  [InvalidLongitudeException, HttpStatus.BAD_REQUEST],
  [InvalidAmountException, HttpStatus.BAD_REQUEST],
  [InvalidCurrencyException, HttpStatus.BAD_REQUEST],
  [RideNotPendingException, HttpStatus.BAD_REQUEST],
]);

export function resolveDomainExceptionHttpStatus(
  exception: DomainException,
): HttpStatus {
  for (const [ExceptionClass, status] of DOMAIN_EXCEPTION_HTTP_STATUS) {
    if (exception instanceof ExceptionClass) {
      return status;
    }
  }

  return HttpStatus.BAD_REQUEST;
}
