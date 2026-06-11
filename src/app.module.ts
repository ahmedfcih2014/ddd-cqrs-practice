import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { IdentityModule } from './domains/identity/identity.module';

@Module({
  imports: [CqrsModule.forRoot(), IdentityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
