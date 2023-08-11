import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription(
      'API Documentation challenge digital wallet dashboard - Securitize',
    )
    .setVersion('1.0.0')
    .addTag('Wallet', 'Ethereum wallets')
    .addTag('Exchange', 'Exchange rates from Euro and US Dollar to ETH')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('wallet/api-docs', app, document);
  await app.listen(process.env.PORT);
}
main();
