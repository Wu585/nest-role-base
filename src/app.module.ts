import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import * as dotenv from "dotenv";

const filePath = `.env.${process.env.NODE_ENV || "development"}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: filePath,
      load: [() => dotenv.config({
        path: ".env"
      })]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
