import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: we will introduce the validation pipe when the time comes
  // app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Booking System')
    .setDescription(
      'Comprehensive API for managing and processing booth bookings, including features for reservation creation, modification, and cancellation. Suitable for various industries such as hospitality, travel, and event management.',
    )
    .setVersion('1.0')
    .addTag('booking', 'Endpoints related to booking operations')
    .addTag('reservations', 'Endpoints for handling reservations')
    .addTag('cancellations', 'Endpoints for managing cancellations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
