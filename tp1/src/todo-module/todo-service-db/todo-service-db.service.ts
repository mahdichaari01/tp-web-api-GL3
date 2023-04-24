import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TodoModel } from "../TodoModel";
import { patchTodoDto, postTodoDto } from "../todo.dto";
import { TodoEntity } from "../Entities/todo.Entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { TodoStatusEnum } from "../TodoStatus";
import {
	PAGINATION_SERVICE_TOKEN,
	QbPaginationService,
} from "src/common-module/qb-pagination/qb-pagination.service";
import { DEFAULT_PAGE_SIZE } from "../todo-module.module";

@Injectable()
export class TodoServiceDb {
	constructor(
		@InjectRepository(TodoEntity)
		private todoRepository: Repository<TodoEntity>,
		@Inject(PAGINATION_SERVICE_TOKEN)
		private paginationService: typeof QbPaginationService,
	) {}
	getTodos(paginationDetails?: { page: number; pageSize: number }) {
		if (!paginationDetails) return this.todoRepository.find();
		return this.paginationService(
			this.todoRepository,
			"",
			paginationDetails.page,
			paginationDetails.pageSize,
		);
	}
	countByStatus(status: TodoStatusEnum): Promise<number> {
		return this.todoRepository.countBy({ status });
	}
	async getTodoById(id: string) {
		const todo = await this.todoRepository.findOneBy({ id: id });
		if (!todo) throw new NotFoundException("No todo found");
		return todo;
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
	async searchByStatusOrString(
		string?: string,
		status?: TodoStatusEnum,
		page?: number,
		pageSize: number = DEFAULT_PAGE_SIZE,
	) {
		const query = [];
		if (status) query.push({ status });
		if (string) {
			query.push({
				name: Like(`%${string}%`),
			});
			query.push({
				description: Like(`%${string}%`),
			});
		}
		return this.paginationService(
			this.todoRepository,
			query,
			page,
			pageSize,
		);
	}
}
