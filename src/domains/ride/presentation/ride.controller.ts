import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard, CustomerId } from 'src/domains/identity/integration';
import { CurrentCustomerId } from 'src/domains/identity/presentation/decorators/current-customer-id.decorator';
import { RideCancelCommand } from 'src/domains/ride/application/commands/ride-cancel/ride-cancel.command';
import { RideCancelResult } from 'src/domains/ride/application/commands/ride-cancel/ride-cancel.result';
import { RideConfirmCommand } from 'src/domains/ride/application/commands/ride-confirm/ride-confirm.command';
import { RideConfirmResult } from 'src/domains/ride/application/commands/ride-confirm/ride-confirm.result';
import { RideRequestCommand } from 'src/domains/ride/application/commands/ride-request/ride-request.command';
import { RideRequestResult } from 'src/domains/ride/application/commands/ride-request/ride-request.result';
import { RideDto } from 'src/domains/ride/presentation/dto/ride.dto';

@Controller('rides')
@UseGuards(AuthGuard)
export class RideController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async requestRide(
    @Body() dto: RideDto,
    @CurrentCustomerId() customerId: string,
  ): Promise<RideRequestResult> {
    return this.commandBus.execute(
      new RideRequestCommand(
        CustomerId.create(customerId),
        dto.pickupLocation,
        dto.dropoffLocation,
        dto.fareEstimate,
        dto.currency,
      ),
    );
  }

  @Post(':rideId/confirm')
  async confirmRide(
    @Param('rideId') rideId: string,
  ): Promise<RideConfirmResult> {
    return this.commandBus.execute(new RideConfirmCommand(rideId));
  }

  @Post(':rideId/cancel')
  async cancelRide(@Param('rideId') rideId: string): Promise<RideCancelResult> {
    return this.commandBus.execute(new RideCancelCommand(rideId));
  }
}
