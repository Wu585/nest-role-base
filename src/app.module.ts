import { Global, Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { LogsModule } from './logs/logs.module';
import * as process from "process";
import * as dotenv from "dotenv";

const filePath = `.env.${process.env.NODE_ENV || "development"}`;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: filePath,
      load: [() => dotenv.config({
        path: ".env"
      })]
    }),
    UsersModule,
    LogsModule
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger]
})
export class AppModule {
}
