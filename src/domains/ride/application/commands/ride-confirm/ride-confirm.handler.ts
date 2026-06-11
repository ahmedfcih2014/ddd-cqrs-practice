import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RideConfirmCommand } from 'src/domains/ride/application/commands/ride-confirm/ride-confirm.command';
import { RideConfirmResult } from 'src/domains/ride/application/commands/ride-confirm/ride-confirm.result';
import { RideIdVO } from 'src/domains/ride/domain/ride-id.vo';

@CommandHandler(RideConfirmCommand)
export class RideConfirmHandler implements ICommandHandler<
  RideConfirmCommand,
  RideConfirmResult
> {
  async execute(command: RideConfirmCommand): Promise<RideConfirmResult> {
    const rideId = RideIdVO.create(command.rideId);
    // TODO: Confirm ride
    return Promise.resolve(
      new RideConfirmResult('Ride confirmed successfully', rideId.value),
    );
  }
}
