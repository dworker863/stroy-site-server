import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  await app.listen(port, () => console.log(`Server listen on PORT: ${port}`));
}
bootstrap();
