import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RideRequestCommand } from 'src/domains/ride/application/commands/ride-request/ride-request.command';
import { RideRequestResult } from 'src/domains/ride/application/commands/ride-request/ride-request.result';
import { CurrencyVO } from 'src/domains/ride/domain/currency.vo';
import { LocationVO } from 'src/domains/ride/domain/location.vo';
import { MoneyVO } from 'src/domains/ride/domain/money.vo';
import { RideIdVO } from 'src/domains/ride/domain/ride-id.vo';
import { Ride } from 'src/domains/ride/domain/ride.aggregate';

@CommandHandler(RideRequestCommand)
export class RideRequestHandler implements ICommandHandler<
  RideRequestCommand,
  RideRequestResult
> {
  async execute(command: RideRequestCommand): Promise<RideRequestResult> {
    const rideId = RideIdVO.generate();
    const pickupLocation = LocationVO.create(
      command.pickupLocation.address,
      command.pickupLocation.lat,
      command.pickupLocation.lng,
    );
    const dropoffLocation = LocationVO.create(
      command.dropoffLocation.address,
      command.dropoffLocation.lat,
      command.dropoffLocation.lng,
    );
    const fareEstimate = MoneyVO.create(
      command.fareEstimate,
      CurrencyVO.create(command.currency),
    );
    const ride = Ride.create(
      rideId,
      command.customerId,
      pickupLocation,
      dropoffLocation,
      fareEstimate,
    );
    // TODO: Save ride to database
    return Promise.resolve(
      new RideRequestResult('Ride requested successfully', ride.id.value),
    );
  }
}
