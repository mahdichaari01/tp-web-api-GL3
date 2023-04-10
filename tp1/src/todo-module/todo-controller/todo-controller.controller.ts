import {
	Controller,
	Get,
	Post,
	Delete,
	Patch,
	Param,
	Body,
	BadRequestException,
	NotFoundException,
} from '@nestjs/common';
import { TodoModel } from '../TodoModel';
import { patchTodoDto, postTodoDto } from '../todo.dto';
import { TodoService } from '../todo-service/todo-service.service';
@Controller('todo')
export class TodoControllerController {
	constructor(private todoService: TodoService) {}
	@Get()
	getTodos(): TodoModel[] {
		return this.todoService.getTodos();
	}
	@Post()
	addTodo(@Body() todo: postTodoDto) {
		return this.todoService.addTodo(todo);
	}
	@Get(':id')
	getTodoById(@Param('id') id: string) {
		const todo = this.todoService.getTodoById(id);
		if (!todo) {
			throw new NotFoundException("Todo doesn't exist");
		}
		return this.todoService.getTodoById(id);
	}
	@Delete(':id')
	deleteTodoById(@Param('id') id: string) {
		return this.todoService.deleteTodoById(id);
	}
	@Patch(':id')
	updateTodoById(@Param('id') id: string, @Body() todo: patchTodoDto) {
		const todoToUpdate = this.todoService.updateTodoById(id, todo);
		if (!todoToUpdate) {
			throw new NotFoundException("Todo doesn't exist");
		}
		return todoToUpdate;
	}
}
