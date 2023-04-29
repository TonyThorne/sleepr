import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  // to add validation pipes to the global scope, we can use the useGlobalPipes() method
  // The whitelist option tells the ValidationPipe to strip any properties that don't have any decorators
  // In other words it will ignore data that does not comply with the DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
