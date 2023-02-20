import { Module } from "@nestjs/common";
import { TodoControllerController } from "./todo-controller/todo-controller.controller";

@Module({
	controllers: [TodoControllerController],
})
export class TodoModuleModule {}
