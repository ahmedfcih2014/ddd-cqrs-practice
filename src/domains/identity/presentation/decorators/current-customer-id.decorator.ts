import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CUSTOMER_ID_REQUEST_KEY } from 'src/domains/identity/presentation/constants/request-keys';

export const CurrentCustomerId = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string => {
    const request = context
      .switchToHttp()
      .getRequest<Request & { [CUSTOMER_ID_REQUEST_KEY]: string }>();

    return request[CUSTOMER_ID_REQUEST_KEY];
  },
);
