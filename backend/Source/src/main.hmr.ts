import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// tslint:disable-next-line:no-var-requires
require('dotenv').config();

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(`starting on PORT ${process.env.HTTP_PORT}`);

  await app.listen(process.env.HTTP_PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
