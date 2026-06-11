import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { resolveDomainExceptionHttpStatus } from 'src/common/mappers/domain-exception-http.mapper';
import { DomainException } from 'src/shared/domain-exception';

interface ValidationFieldError {
  field: string;
  messages: string[];
}

interface ClassValidatorError {
  property: string;
  constraints?: Record<string, string>;
  children?: ClassValidatorError[];
}

function isClassValidatorError(value: unknown): value is ClassValidatorError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'property' in value &&
    typeof (value as ClassValidatorError).property === 'string'
  );
}

function flattenValidationErrors(
  errors: ClassValidatorError[],
  parentPath = '',
): ValidationFieldError[] {
  const result: ValidationFieldError[] = [];

  for (const error of errors) {
    const field = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    if (error.constraints) {
      result.push({
        field,
        messages: Object.values(error.constraints),
      });
    }

    if (error.children?.length) {
      result.push(...flattenValidationErrors(error.children, field));
    }
  }

  return result;
}

function extractExceptionPayload(exception: HttpException): {
  message: string | string[];
  errors?: ValidationFieldError[];
} {
  const response = exception.getResponse();

  if (typeof response === 'string') {
    return { message: response };
  }

  if (typeof response === 'object' && response !== null) {
    const body = response as Record<string, unknown>;
    const message = body.message;

    if (Array.isArray(message)) {
      const validationErrors = message.filter(isClassValidatorError);

      if (validationErrors.length > 0) {
        return {
          message: 'Validation failed',
          errors: flattenValidationErrors(validationErrors),
        };
      }
    }

    if (typeof message === 'string' || Array.isArray(message)) {
      return { message };
    }

    if (typeof body.error === 'string') {
      return { message: body.error };
    }
  }

  return { message: exception.message };
}

export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let payload: {
      message: string | string[];
      errors?: ValidationFieldError[];
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      payload = extractExceptionPayload(exception);
    } else if (exception instanceof DomainException) {
      status = resolveDomainExceptionHttpStatus(exception);
      payload = { message: exception.message };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      payload = { message: 'Internal server error' };
    }

    console.log(exception);

    response.status(status).json({
      statusCode: status,
      ...payload,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
