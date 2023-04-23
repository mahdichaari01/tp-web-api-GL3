import { Module } from "@nestjs/common";
import {
	TodoController,
	TodoDBController,
} from "./todo-controller/todo-controller.controller";
import { TodoService } from "./todo-service/todo-service.service";
import { TodoServiceDb } from "./todo-service-db/todo-service-db.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./Entities/todo.Entity";

@Module({
	controllers: [TodoController, TodoDBController],
	providers: [TodoService, TodoServiceDb],
	imports: [TypeOrmModule.forFeature([TodoEntity])],
})
export class TodoModuleModule {}
