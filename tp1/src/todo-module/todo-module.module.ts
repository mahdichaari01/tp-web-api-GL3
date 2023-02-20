import { Module } from '@nestjs/common';
import { TodoControllerController } from './todo-controller/todo-controller.controller';
import { TodoService } from './todo-service/todo-service.service';

@Module({
	controllers: [TodoControllerController],
	providers: [TodoService],
})
export class TodoModuleModule {}
