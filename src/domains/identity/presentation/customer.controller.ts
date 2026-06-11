import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CurrentCustomerId } from 'src/domains/identity/presentation/decorators/current-customer-id.decorator';
import { AuthGuard } from 'src/domains/identity/presentation/guards/auth.guard';
import { ActivateCustomerCommand } from 'src/domains/identity/application/commands/activate-customer/activate-customer.command';
import { ActivateCustomerResult } from 'src/domains/identity/application/commands/activate-customer/activate-customer.result';
import { DeactivateCustomerCommand } from 'src/domains/identity/application/commands/deactivate-customer/deactivate-customer.command';
import { DeactivateCustomerResult } from 'src/domains/identity/application/commands/deactivate-customer/deactivate-customer.result';
import { RegisterCustomerCommand } from 'src/domains/identity/application/commands/register-customer/register-customer.command';
import { RegisterCustomerResult } from 'src/domains/identity/application/commands/register-customer/register-customer.result';
import { ProfileQuery } from 'src/domains/identity/application/queries/profile-query/profile.query';
import { ProfileResult } from 'src/domains/identity/application/queries/profile-query/profile.result';
import { RegisterCustomerDto } from 'src/domains/identity/presentation/dto/register.dto';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async registerCustomer(
    @Body() dto: RegisterCustomerDto,
  ): Promise<RegisterCustomerResult> {
    return this.commandBus.execute(
      new RegisterCustomerCommand(dto.email, dto.name, dto.password),
    );
  }

  @Post(':customerId/activate')
  async activateCustomer(
    @Param('customerId') customerId: string,
  ): Promise<ActivateCustomerResult> {
    return this.commandBus.execute(new ActivateCustomerCommand(customerId));
  }

  @Post(':customerId/deactivate')
  async deactivateCustomer(
    @Param('customerId') customerId: string,
  ): Promise<DeactivateCustomerResult> {
    return this.commandBus.execute(new DeactivateCustomerCommand(customerId));
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(
    @CurrentCustomerId() customerId: string,
  ): Promise<ProfileResult> {
    return this.queryBus.execute(new ProfileQuery(customerId));
  }
}
