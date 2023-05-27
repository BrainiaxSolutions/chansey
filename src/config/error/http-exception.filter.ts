import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ExceptionDto } from './exception.dto';

@Catch(ExceptionDto)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: ExceptionDto, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error.';

    if (exception.typeError === 'HttpException') {
      statusCode = exception.error.status;
      message = exception.error.response;
    }

    return response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      timestamp: new Date(),
    });
  }
}
