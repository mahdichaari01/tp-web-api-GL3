import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PremierModule } from "./premier/premier.module";
import { TodoModuleModule } from "./todo-module/todo-module.module";
import { CommonModuleModule } from "./common-module/common-module.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TodoEntity } from "./todo-module/Entities/todo.Entity";

@Module({
	imports: [
		PremierModule,
		TodoModuleModule,
		CommonModuleModule,
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				type: "mysql",
				host: configService.get("DATABASE_HOST"),
				port: configService.get("DATABASE_PORT"),
				username: configService.get("DATABASE_USER"),
				password: configService.get("DATABASE_PASSWORD"),
				database: configService.get("DATABASE_NAME"),
				entities: [TodoEntity],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
