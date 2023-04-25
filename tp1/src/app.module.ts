import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PremierModule } from "./premier/premier.module";
import { TodoModuleModule } from "./todo-module/todo-module.module";
import { CommonModuleModule } from "./common-module/common-module.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TodoEntity } from "./todo-module/Entities/todo.Entity";
import {
	QbPaginationService,
	PAGINATION_SERVICE_TOKEN,
} from "./common-module/qb-pagination/qb-pagination.service";
import { Tp3Module } from "./tp3/tp3.module";
import { Cv } from "./tp3/cvs/entities/cv.entity";
import { Skill } from "./tp3/skills/entities/skill.entity";
import { User } from "./tp3/users/entities/user.entity";

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
				entities: [TodoEntity, User, Skill, Cv],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		Tp3Module,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
