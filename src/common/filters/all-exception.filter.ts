import * as requestIp from "request-ip";
import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, LoggerService } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {
  }

  catch(exception: unknown, host: ArgumentsHost): any {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus = exception instanceof HttpException
      ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toISOString(),
      // 还可以加入一些用户信息
      ip: requestIp.getClientIp(request),
      exception: exception["name"],
      error: exception["response"] || "Internet Server Error"
    };

    this.logger.error(responseBody);
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
