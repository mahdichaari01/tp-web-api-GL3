import {
	Controller,
	Get,
	Post,
	Delete,
	Patch,
	Param,
	Body,
	NotFoundException,
	UsePipes,
	ValidationPipe,
	Query,
	Headers,
	Request,
} from "@nestjs/common";
import { TodoModel } from "../TodoModel";
import { patchTodoDto, postTodoDto, searchDTO } from "../todo.dto";
import { TodoService } from "../todo-service/todo-service.service";
import { TodoServiceDb } from "../todo-service-db/todo-service-db.service";
import { TodoStatusEnum } from "../TodoStatus";
@Controller({ path: "todo", version: "1" })
@UsePipes(ValidationPipe)
export class TodoController {
	constructor(private todoService: TodoService) {}
	@Get()
	getTodos(): TodoModel[] {
		return this.todoService.getTodos();
	}
	@Post()
	addTodo(@Body() todo: postTodoDto) {
		return this.todoService.addTodo(todo);
	}
	@Get(":id")
	getTodoById(@Param("id") id: string) {
		const todo = this.todoService.getTodoById(id);
		if (!todo) {
			throw new NotFoundException("Todo doesn't exist");
		}
		return this.todoService.getTodoById(id);
	}
	@Delete(":id")
	deleteTodoById(@Param("id") id: string) {
		return this.todoService.deleteTodoById(id);
	}
	@Patch(":id")
	updateTodoById(@Param("id") id: string, @Body() todo: patchTodoDto) {
		const todoToUpdate = this.todoService.updateTodoById(id, todo);
		if (!todoToUpdate) {
			throw new NotFoundException("Todo doesn't exist");
		}
		return todoToUpdate;
	}
}
@Controller("DBTodo")
@UsePipes(ValidationPipe)
export class TodoDBController {
	constructor(private todoService: TodoServiceDb) {}
	@Get()
	getTodos(@Query() query: searchDTO) {
		return this.todoService.searchByStatusOrString(
			query.string,
			query.status,
			query.page,
			query.pageSize,
		);
	}
	@Post()
	addTodo(@Body() todo: postTodoDto, @Request() req: Request) {
		return this.todoService.addTodo(todo, req["userID"]);
	}
	@Get(":id")
	getTodoById(@Param("id") id: string) {
		return this.todoService.getTodoById(id);
	}
	@Get("count/all")
	async countTodos() {
		return {
			done: await this.todoService.countByStatus(TodoStatusEnum.done),
			waiting: await this.todoService.countByStatus(
				TodoStatusEnum.waiting,
			),
			actif: await this.todoService.countByStatus(TodoStatusEnum.actif),
		};
	}
	@Get("count/:status")
	countByStatus(@Param("status") status: TodoStatusEnum) {
		return this.todoService.countByStatus(status);
	}
	@Delete(":id")
	deleteTodoById(@Param("id") id: string, @Request() req: Request) {
		return this.todoService.softDeleteTodoById(id, req["userID"]);
	}
	@Delete("/hard/:id")
	hardDeleteTodoById(@Param("id") id: string, @Request() req: Request) {
		return this.todoService.deleteTodoById(id, req["userID"]);
	}
	@Patch(":id")
	updateTodoById(
		@Param("id") id: string,
		@Body() todo: patchTodoDto,
		@Request() req: Request,
	) {
		const todoToUpdate = this.todoService.updateTodoById(
			id,
			todo,
			req["userID"],
		);
		if (!todoToUpdate) {
			throw new NotFoundException("Todo doesn't exist");
		}
		return todoToUpdate;
	}
	@Get("restore/:id")
	restoreTodoById(@Param("id") id: string, @Request() req: Request) {
		return this.todoService.restoreTodoById(id, req["userID"]);
	}
	@Get("restore")
	restoreAllTodos(@Request() req: Request) {
		return this.todoService.restoreAllTodos(req["userID"]);
	}
}
