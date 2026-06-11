import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RideCancelledIntegrationHandler } from 'src/domains/ride/infrastructure/handlers/ride-cancelled-integration.handler';
import { RideConfirmedIntegrationHandler } from 'src/domains/ride/infrastructure/handlers/ride-confirmed-integration.handler';
import { RideRequestedIntegrationHandler } from 'src/domains/ride/infrastructure/handlers/ride-requested-integration.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    RideCancelledIntegrationHandler,
    RideRequestedIntegrationHandler,
    RideConfirmedIntegrationHandler,
  ],
})
export class RideModule {}
