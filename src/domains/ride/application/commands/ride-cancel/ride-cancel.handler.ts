import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RideCancelCommand } from 'src/domains/ride/application/commands/ride-cancel/ride-cancel.command';
import { RideCancelResult } from 'src/domains/ride/application/commands/ride-cancel/ride-cancel.result';
import { RideIdVO } from 'src/domains/ride/domain/ride-id.vo';

@CommandHandler(RideCancelCommand)
export class RideCancelHandler implements ICommandHandler<
  RideCancelCommand,
  RideCancelResult
> {
  async execute(command: RideCancelCommand): Promise<RideCancelResult> {
    const rideId = RideIdVO.create(command.rideId);
    // TODO: Confirm ride
    return Promise.resolve(
      new RideCancelResult('Ride cancelled successfully', rideId.value),
    );
  }
}
