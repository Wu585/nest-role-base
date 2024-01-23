import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as winston from "winston";
import { createLogger } from "winston";
import { utilities, WinstonModule } from "nest-winston";
import "winston-daily-rotate-file";
import { AllExceptionFilter } from "./common/filters/all-exception.filter";

async function bootstrap() {
  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike()
        )
      }),
      new winston.transports.DailyRotateFile({
        dirname: "logs",
        level: "warn",
        filename: "application-%DATE%.log",
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple()
        )
      }),
      new winston.transports.DailyRotateFile({
        dirname: "logs",
        level: "info",
        filename: "info-%DATE%.log",
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple()
        )
      })
    ]
  });

  const logger = WinstonModule.createLogger({
    instance
  });

  const app = await NestFactory.create(AppModule, {
    logger
  });

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));

  const port = 3000;

  await app.listen(port);

}

bootstrap();
