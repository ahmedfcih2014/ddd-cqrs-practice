import { InvalidAddressException } from 'src/domains/ride/domain/exceptions/invalid-address.exception';
import { InvalidLatitudeException } from 'src/domains/ride/domain/exceptions/invalid-lat.exception';
import { InvalidLongitudeException } from 'src/domains/ride/domain/exceptions/invalid-lng.exception';

export class LocationVO {
  private constructor(
    public readonly address: string,
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}

  public static create(
    address: string,
    latitude: number,
    longitude: number,
  ): LocationVO {
    if (address.length < 3 || address.length > 200) {
      throw new InvalidAddressException();
    }
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
      throw new InvalidLatitudeException();
    }
    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      throw new InvalidLongitudeException();
    }
    return new LocationVO(address, latitude, longitude);
  }
}
