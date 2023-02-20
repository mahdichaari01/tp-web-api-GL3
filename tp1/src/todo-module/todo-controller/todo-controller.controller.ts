import {
	Controller,
	Get,
	Query,
	Post,
	Delete,
	Patch,
	Param,
} from '@nestjs/common';
import { TodoModel, TodoStatusEnum } from '../TodoModel';

@Controller('todo')
export class TodoControllerController {
	private todos: TodoModel[] = [];
	@Get()
	getTodos(): TodoModel[] {
		return this.todos;
	}
	@Post()
	addTodo(
		@Query('name') name: string | undefined,
		@Query('description') description: string | undefined,
		@Query('status') status: TodoStatusEnum | undefined,
	) {
		const todo = new TodoModel(name, description, status);
		this.todos.push(todo);
	}
	@Get(':id')
	getTodoById(@Param('id') id: string) {
		return this.todos.find((todo) => todo.id === id);
	}
	@Delete(':id')
	deleteTodoById(@Param('id') id: string) {
		this.todos = this.todos.filter((todo) => todo.id !== id);
	}
	@Patch(':id')
	updateTodoById(
		@Param('id') id: string,
		@Query('name') name: string | undefined,
		@Query('description') description: string | undefined,
		@Query('status') status: TodoStatusEnum | undefined,
	) {
		const todo = this.todos.find((todo) => todo.id === id);
		if (name) {
			todo.name = name;
		}
		if (description) {
			todo.description = description;
		}
		if (status) {
			todo.status = status;
		}
	}
}
