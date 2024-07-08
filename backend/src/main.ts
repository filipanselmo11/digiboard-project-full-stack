import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Digiboard API')
    .setDescription(
      'Api de controle de estoque. Esta api é um teste para vaga de Dev Full Stack na empresa Digiboard'
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const documment = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documment);
  await app.listen(3000);
}
bootstrap();
