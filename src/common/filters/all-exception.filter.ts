import * as requestIp from "request-ip";
import {ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, LoggerService} from "@nestjs/common";
import {HttpAdapterHost} from "@nestjs/core";
import {Prisma} from "@prisma/client";

export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {
  }

  catch(exception: unknown, host: ArgumentsHost): any {
    const {httpAdapter} = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus = exception instanceof HttpException
      ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let statusCode: number | string = httpStatus

    let msg = exception["response"] || "Internet Server Error"

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {

      switch (exception.code) {
        case "P2002":
          msg = "唯一索引冲突"
          statusCode = exception.code
          break
      }
    }

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toISOString(),
      // 还可以加入一些用户信息
      ip: requestIp.getClientIp(request),
      exception: exception["name"],
      statusCode: statusCode,
      error: msg
    };

    this.logger.error(responseBody);
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
