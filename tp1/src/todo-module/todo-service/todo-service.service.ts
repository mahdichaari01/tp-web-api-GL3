import { Inject, Injectable } from "@nestjs/common";
import { UUID_TOKEN } from "../../common-module/common-module.module";
import { patchTodoDto, postTodoDto } from "../todo.dto";
import { TodoModel } from "../TodoModel";
@Injectable()
export class TodoService {
	constructor(@Inject(UUID_TOKEN) private uuid) {}
	private todos: TodoModel[] = [];
	getTodos(): TodoModel[] {
		return this.todos;
	}
	addTodo(todo: postTodoDto) {
		const newTodo = new TodoModel(Object.assign(todo, { id: this.uuid() }));
		this.todos.push(newTodo);
		return newTodo;
	}
	getTodoById(id: string): TodoModel {
		return this.todos.find((todo) => todo.id === id);
	}
	deleteTodoById(id: string): number {
		const intitalLength = this.todos.length;
		this.todos = this.todos.filter((todo) => todo.id !== id);
		return intitalLength - this.todos.length;
	}
	updateTodoById(id: string, todo: patchTodoDto) {
		const newTodo = this.todos.find((todo) => todo.id === id);
		if (!newTodo) {
			return null;
		}
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
