import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { InjectLogger, InjectPipes, InjectSwagger } from 'core/injectors';
import AppConfig from './configs/app.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = AppConfig.APP.PORT;

    InjectPipes(app);
    InjectLogger(app);
    InjectSwagger(app);

    await app.listen(PORT);
}
bootstrap();
