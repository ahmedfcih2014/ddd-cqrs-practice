import { CustomerId } from 'src/domains/identity/integration';
import { LocationDto } from 'src/domains/ride/presentation/dto/ride.dto';

export class RideRequestCommand {
  constructor(
    public readonly customerId: CustomerId,
    public readonly pickupLocation: LocationDto,
    public readonly dropoffLocation: LocationDto,
    public readonly fareEstimate: number,
    public readonly currency: string,
  ) {}
}
