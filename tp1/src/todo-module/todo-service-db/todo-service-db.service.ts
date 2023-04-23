import { Injectable } from "@nestjs/common";
import { TodoModel } from "../TodoModel";
import { patchTodoDto, postTodoDto } from "../todo.dto";
import { TodoEntity } from "../Entities/todo.Entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TodoStatusEnum } from "../TodoStatus";

@Injectable()
export class TodoServiceDb {
	constructor(
		@InjectRepository(TodoEntity)
		private todoRepository: Repository<TodoEntity>,
	) {}
	getTodos(): Promise<TodoEntity[]> {
		return this.todoRepository.find();
	}
	countByStatus(status: TodoStatusEnum): Promise<number> {
		return this.todoRepository.countBy({ status });
	}
	getTodoById(item: string) {
		return this.todoRepository.findOneBy({ id: item });
	}
	addTodo(todo: postTodoDto | postTodoDto[]): Promise<TodoEntity[]> {
		if (!Array.isArray(todo)) todo = [todo];
		const newTodo = this.todoRepository.create(todo);
		return this.todoRepository.save(newTodo);
	}
	updateTodoById(id: string, todo: patchTodoDto) {
		return this.todoRepository.update(id, todo);
	}
	softDeleteTodoById(id: string) {
		return this.todoRepository.softDelete(id);
	}
	deleteTodoById(id: string) {
		return this.todoRepository.delete(id);
	}
	restoreTodoById(id: string) {
		return this.todoRepository.restore(id);
	}
	restoreAllTodos() {
		return this.todoRepository.restore({});
	}
}
