import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { IdentityModule } from './domains/identity/identity.module';
import { RideModule } from './domains/ride/ride.module';

@Module({
  imports: [CqrsModule.forRoot(), IdentityModule, RideModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
