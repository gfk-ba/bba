import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as express from 'express';

// tslint:disable-next-line:no-var-requires
require('dotenv').config();

async function bootstrap() {
  const cors = require('cors');

  const app = await NestFactory.create(AppModule);
  app.use(cors());

  console.log(`starting on PORT ${process.env.HTTP_PORT}`);

  // ausliefern statischer Dateien
  app.use(express.static(path.join(__dirname, 'public')));
  await app.listen(process.env.HTTP_PORT);
}
bootstrap();
