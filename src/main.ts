import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
