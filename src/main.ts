import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './config/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!configuration.isProduction()) {

    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('uLesson API')
      .setDescription('Test API for uLesson')
      .build());

    SwaggerModule.setup('docs', app, document);

  }

  await app.listen(3000);
}
bootstrap();
