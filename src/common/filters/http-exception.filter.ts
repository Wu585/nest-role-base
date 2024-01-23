import { ArgumentsHost, Catch, ExceptionFilter, HttpException, LoggerService } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {
  }

  catch(exception: any, host: ArgumentsHost): any {
    // host 代表的是整个nest进程
    // switchToHttp 可以找到当前程序运行的上下文

    const ctx = host.switchToHttp();

    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = exception.getStatus();

    console.log(status);

    this.logger.error(request.method, request.url, exception.message, exception.stack);

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      // path: request.url,
      // method: request.method,
      message: exception.message || HttpException.name
    });
  }
}
