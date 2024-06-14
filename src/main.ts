import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Booking System')
    .setDescription(
      'Comprehensive API for managing and processing booth bookings, including features for reservation creation, modification, and cancellation. Suitable for various industries such as hospitality, travel, and event management.',
    )
    .setVersion('1.0')
    .addTag('Users', 'Endpoints related to user based operations')
    .addTag('Booking', 'Endpoints related to booking operations')
    .addTag('Reservations', 'Endpoints for handling reservations')
    .addTag('Cancellations', 'Endpoints for managing cancellations')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
