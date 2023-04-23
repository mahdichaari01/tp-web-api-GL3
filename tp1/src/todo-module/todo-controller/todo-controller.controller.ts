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
} from "@nestjs/common";
import { TodoModel } from "../TodoModel";
import { patchTodoDto, postTodoDto } from "../todo.dto";
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
@Controller({ version: "2", path: "todo" })
@UsePipes(ValidationPipe)
export class TodoDBController {
	constructor(private todoService: TodoServiceDb) {}
	@Get()
	getTodos() {
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
	@Get("count/:status")
	countByStatus(@Param("status") status: TodoStatusEnum) {
		return this.todoService.countByStatus(status);
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
