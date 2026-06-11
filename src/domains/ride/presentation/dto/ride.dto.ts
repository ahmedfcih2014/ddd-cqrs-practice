import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
  @IsNotEmpty()
  @Length(3, 200)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;
}

export class RideDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  pickupLocation: LocationDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  dropoffLocation: LocationDto;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000)
  fareEstimate: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['GBP', 'USD', 'EUR'])
  currency: string;
}
