import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RideCancelledIntegrationHandler } from 'src/domains/ride/infrastructure/handlers/ride-cancelled-integration.handler';
import { RideConfirmedIntegrationHandler } from 'src/domains/ride/infrastructure/handlers/ride-confirmed-integration.handler';
import { RideRequestedIntegrationHandler } from 'src/domains/ride/infrastructure/handlers/ride-requested-integration.handler';
import { RideController } from './presentation/ride.controller';
import { IdentityModule } from 'src/domains/identity/identity.module';
import { RideConfirmHandler } from 'src/domains/ride/application/commands/ride-confirm/ride-confirm.handler';
import { RideCancelHandler } from 'src/domains/ride/application/commands/ride-cancel/ride-cancel.handler';
import { RideRequestHandler } from 'src/domains/ride/application/commands/ride-request/ride-request.handler';

@Module({
  imports: [CqrsModule, IdentityModule],
  providers: [
    RideCancelledIntegrationHandler,
    RideRequestedIntegrationHandler,
    RideConfirmedIntegrationHandler,
    RideCancelHandler,
    RideConfirmHandler,
    RideRequestHandler,
  ],
  controllers: [RideController],
})
export class RideModule {}
