import {
	Controller,
	Get,
	Query,
	Post,
	Delete,
	Patch,
	Param,
	Body,
} from '@nestjs/common';
import { TodoModel, TodoStatusEnum } from '../TodoModel';
import { todoDto } from '../todo.dto';
import { TodoService } from '../todo-service/todo-service.service';
@Controller('todo')
export class TodoControllerController {
	constructor(private todoService: TodoService) {}
	@Get()
	getTodos(): TodoModel[] {
		return this.todoService.getTodos();
	}
	@Post()
	addTodo(@Body() todo: todoDto) {
		return this.todoService.addTodo(todo);
	}
	@Get(':id')
	getTodoById(@Param('id') id: string) {
		return this.todoService.getTodoById(id);
	}
	@Delete(':id')
	deleteTodoById(@Param('id') id: string) {
		return this.todoService.deleteTodoById(id);
	}
	@Patch(':id')
	updateTodoById(@Param('id') id: string, @Body() todo: todoDto) {
		return this.todoService.updateTodoById(id, todo);
	}
}
