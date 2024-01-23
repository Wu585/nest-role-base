import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import * as process from "process";
import * as dotenv from "dotenv";
import { LoggerModule } from "nestjs-pino";

const filePath = `.env.${process.env.NODE_ENV || "development"}`;

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV === "development" ? {
          target: "pino-pretty",
          options: {
            colorize: true
          }
        } : {
          target: "pino-roll",
          options: {
            file: "log.txt",
            frequency: "daily",
            mkdir: true,
            size: "1m"
          }
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: filePath,
      load: [() => dotenv.config({
        path: ".env"
      })]
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
