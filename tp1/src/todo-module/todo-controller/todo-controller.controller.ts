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
@Controller('todo')
export class TodoControllerController {
	private todos: TodoModel[] = [];
	@Get()
	getTodos(): TodoModel[] {
		return this.todos;
	}
	@Post()
	addTodo(@Body() todo: todoDto) {
		const { name, description, status } = todo;
		const newTodo = new TodoModel(name, description, status);
		this.todos.push(newTodo);
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
	updateTodoById(@Param('id') id: string, @Body() todo: todoDto) {
		const newTodo = this.todos.find((todo) => todo.id === id);
		const { name, description, status } = todo;
		if (name) {
			newTodo.name = name;
		}
		if (description) {
			newTodo.description = description;
		}
		if (status) {
			newTodo.status = status;
		}
	}
}
