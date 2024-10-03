import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

import { AppModule } from "@/app.module"

const PORT = process.env.PORT || 3000

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder()
        .setTitle("API title")
        .setDescription("API description")
        .setVersion("1.0")
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/", app, document)

    await app.listen(PORT)
}

bootstrap()
