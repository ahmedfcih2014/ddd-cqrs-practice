import { CustomerId } from 'src/domains/identity/integration';
import { RideNotPendingException } from 'src/domains/ride/domain/exceptions/ride-not-pending.exception';
import { LocationVO } from 'src/domains/ride/domain/location.vo';
import { MoneyVO } from 'src/domains/ride/domain/money.vo';
import { RideCancelledEvent } from 'src/domains/ride/domain/ride-cancelled.event';
import { RideConfirmedEvent } from 'src/domains/ride/domain/ride-confirmed.event';
import { RideIdVO } from 'src/domains/ride/domain/ride-id.vo';
import { RideRequestedEvent } from 'src/domains/ride/domain/ride-requested.event';
import { RideStatus } from 'src/domains/ride/domain/ride-status.enum';
import { AggregateRoot } from 'src/shared/aggregate-root';

export class Ride extends AggregateRoot {
  private constructor(
    public readonly id: RideIdVO,
    public readonly customerId: CustomerId,
    public readonly pickupLocation: LocationVO,
    public readonly dropoffLocation: LocationVO,
    public readonly fareEstimate: MoneyVO,
    private status: RideStatus,
  ) {
    super();
  }

  public static create(
    id: RideIdVO,
    customerId: CustomerId,
    pickupLocation: LocationVO,
    dropoffLocation: LocationVO,
    fareEstimate: MoneyVO,
  ): Ride {
    const ride = new Ride(
      id,
      customerId,
      pickupLocation,
      dropoffLocation,
      fareEstimate,
      RideStatus.PENDING,
    );
    ride.addDomainEvent(new RideRequestedEvent(ride.id.value));
    return ride;
  }

  public confirm(): void {
    if (this.status !== RideStatus.PENDING) {
      throw new RideNotPendingException();
    }
    this.status = RideStatus.CONFIRMED;
    this.addDomainEvent(new RideConfirmedEvent(this.id.value));
  }

  public cancel(): void {
    if (this.status !== RideStatus.PENDING) {
      throw new RideNotPendingException();
    }
    this.status = RideStatus.CANCELLED;
    this.addDomainEvent(new RideCancelledEvent(this.id.value));
  }

  public getStatus(): RideStatus {
    return this.status;
  }
}
