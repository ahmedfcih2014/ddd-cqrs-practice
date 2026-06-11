import { Body, Controller, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { LoginQuery } from 'src/domains/identity/application/queries/login-query/login.query';
import { LoginResult } from 'src/domains/identity/application/queries/login-query/login.result';
import { LoginDto } from 'src/domains/identity/presentation/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('login')
  async loginCustomer(@Body() dto: LoginDto): Promise<LoginResult> {
    return this.queryBus.execute(new LoginQuery(dto.email, dto.password));
  }
}
