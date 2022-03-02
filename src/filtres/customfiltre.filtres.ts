import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(HttpException)
export class CustomFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    response.status(exception.getStatus()).json({
      message: 'Le message de l`erreur est ; ' + exception.message,
      statusCode: exception.getStatus(),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
    return response;
  }
}
