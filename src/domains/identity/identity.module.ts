import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ActivateCustomerHandler } from 'src/domains/identity/application/commands/activate-customer/activate-customer.handler';
import { DeactivateCustomerHandler } from 'src/domains/identity/application/commands/deactivate-customer/deactivate-customer.handler';
import { RegisterCustomerHandler } from 'src/domains/identity/application/commands/register-customer/register-customer.handler';
import { LoginHandler } from 'src/domains/identity/application/queries/login-query/login.handler';
import { ProfileHandler } from 'src/domains/identity/application/queries/profile-query/profile.handler';
import { AUTH_TOKEN_RESOLVER } from 'src/domains/identity/application/contracts/auth-token-resolver.interface';
import { CUSTOMER_LOOKUP } from 'src/domains/identity/application/contracts/customer-lookup.interface';
import { CUSTOMER_REPO } from 'src/domains/identity/application/contracts/customer-repo.interface';
import { OUTBOX_REPO } from 'src/domains/identity/application/contracts/outbox-repo.interface';
import { TRANSACTION_MANAGER } from 'src/domains/identity/application/contracts/transaction-manager.interface';
import { CustomerLookupService } from 'src/domains/identity/infrastructure/customer-lookup.service';
import { CustomerRepo } from 'src/domains/identity/infrastructure/customer.repo';
import { AuthController } from 'src/domains/identity/presentation/auth.controller';
import { CustomerController } from 'src/domains/identity/presentation/customer.controller';
import { PASSWORD_HASH } from 'src/domains/identity/application/contracts/password-hash.interface';
import { PasswordHashService } from 'src/domains/identity/infrastructure/password-hash.service';
import { OutboxRepo } from 'src/domains/identity/infrastructure/outbox.repo';
import { InMemoryTransactionManager } from 'src/domains/identity/infrastructure/in-memory-transaction.manager';
import { OutboxRelayService } from 'src/domains/identity/infrastructure/outbox-relay.service';
import { CustomerActivatedIntegrationHandler } from 'src/domains/identity/infrastructure/handlers/customer-activated-integration.handler';
import { CustomerDeactivatedIntegrationHandler } from 'src/domains/identity/infrastructure/handlers/customer-deactivated-integration.handler';
import { CustomerRegisteredIntegrationHandler } from 'src/domains/identity/infrastructure/handlers/customer-registered-integration.handler';
import { AuthTokenResolver } from 'src/domains/identity/infrastructure/auth-token.resolver';
import { AuthGuard } from 'src/domains/identity/presentation/guards/auth.guard';

@Module({
  imports: [CqrsModule],
  controllers: [CustomerController, AuthController],
  providers: [
    CustomerRegisteredIntegrationHandler,
    CustomerActivatedIntegrationHandler,
    CustomerDeactivatedIntegrationHandler,
    AuthGuard,
    OutboxRelayService,
    RegisterCustomerHandler,
    ActivateCustomerHandler,
    DeactivateCustomerHandler,
    LoginHandler,
    ProfileHandler,
    {
      provide: AUTH_TOKEN_RESOLVER,
      useClass: AuthTokenResolver,
    },
    {
      provide: CUSTOMER_REPO,
      useClass: CustomerRepo,
    },
    {
      provide: CUSTOMER_LOOKUP,
      useClass: CustomerLookupService,
    },
    {
      provide: OUTBOX_REPO,
      useClass: OutboxRepo,
    },
    {
      provide: TRANSACTION_MANAGER,
      useClass: InMemoryTransactionManager,
    },
    {
      provide: PASSWORD_HASH,
      useClass: PasswordHashService,
    },
  ],
  exports: [CUSTOMER_LOOKUP],
})
export class IdentityModule {}
