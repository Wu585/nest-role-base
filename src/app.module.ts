import { Global, Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { LogsModule } from './logs/logs.module';
import { ViewsModule } from './views/views.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { MenusModule } from './menus/menus.module';
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
    LogsModule,
    ViewsModule,
    UploadModule,
    AuthModule,
    RolesModule,
    MenusModule
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger]
})
export class AppModule {
}
