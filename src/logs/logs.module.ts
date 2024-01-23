import { Module } from "@nestjs/common";
import { WinstonModule, WinstonModuleOptions } from "nest-winston";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>({

      } as WinstonModuleOptions)
    })
  ]
})
export class LogsModule {
}
