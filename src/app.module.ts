import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { IdentityModule } from './domains/identity/identity.module';
import { RideModule } from './domains/ride/ride.module';
import { OutboxModule } from './shared/outbox/outbox.module';

@Module({
  imports: [CqrsModule.forRoot(), OutboxModule, IdentityModule, RideModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
