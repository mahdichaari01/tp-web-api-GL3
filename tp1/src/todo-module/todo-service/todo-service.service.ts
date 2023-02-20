import { Injectable } from '@nestjs/common';
import { UuidService } from 'src/common-module/uuid/uuid.service';
import { todoDto } from '../todo.dto';
import { TodoModel } from '../TodoModel';
@Injectable()
export class TodoService {
	constructor(private uuid: UuidService) {}
	private todos: TodoModel[] = [];
	getTodos(): TodoModel[] {
		return this.todos;
	}
	addTodo(todo: todoDto) {
		const newTodo = new TodoModel(
			Object.assign(todo, { id: this.uuid.generate() }),
		);
		this.todos.push(newTodo);
		return newTodo;
	}
	getTodoById(id: string): TodoModel {
		return this.todos.find((todo) => todo.id === id);
	}
	deleteTodoById(id: string) {
		this.todos = this.todos.filter((todo) => todo.id !== id);
	}
	updateTodoById(id: string, todo: todoDto) {
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
		return newTodo;
	}
}
