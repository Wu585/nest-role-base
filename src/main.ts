import { HttpAdapterHost, NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { AllExceptionFilter } from "./common/filters/all-exception.filter";
import { ResponseInterceptor } from "./common/interceptors/transform.interceptor";
import { join } from "path";
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);

  app.useStaticAssets(join(__dirname, "tmp_images"), {
    prefix: "/images"
  });

  app.use(json({limit: '50mb'}))
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));

  const port = 3000;

  await app.listen(port);

}

bootstrap();
