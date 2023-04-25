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
} from "../../common-module/qb-pagination/qb-pagination.service";
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
	addTodo(
		todo: postTodoDto | postTodoDto[],
		userID?: string,
	): Promise<TodoEntity[]> {
		if (!Array.isArray(todo)) todo = [todo];
		todo = todo.map((todo) => Object.assign(todo, { owner: userID }));
		const newTodo = this.todoRepository.create(todo);
		return this.todoRepository.save(newTodo);
	}
	async updateTodoById(id: string, todo: patchTodoDto, user?: string) {
		return this.todoRepository.update(
			{
				id: id,
				owner: user,
			},
			todo,
		);
	}
	softDeleteTodoById(id: string, user: string) {
		return this.todoRepository.softDelete({ id: id, owner: user });
	}
	deleteTodoById(id: string, user: string) {
		return this.todoRepository.delete({ id: id, owner: user });
	}
	restoreTodoById(id: string, user: string) {
		return this.todoRepository.restore({ id: id, owner: user });
	}
	restoreAllTodos(user: string) {
		return this.todoRepository.restore({ owner: user });
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
