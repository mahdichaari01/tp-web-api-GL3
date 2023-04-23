import { ValidationErrors } from "src/Messages/ErrorMessages";
import { TodoStatusEnum } from "./TodoStatus";
import { IsNotEmpty, MinLength, MaxLength, IsEnum } from "class-validator";
import { PartialType, PickType } from "@nestjs/mapped-types";

export class postTodoDto {
	@IsNotEmpty({ message: ValidationErrors.isNotEmpty })
	@MinLength(3, { message: ValidationErrors.min })
	@MaxLength(10, { message: ValidationErrors.max })
	name: string;
	@IsNotEmpty()
	@MinLength(10)
	description: string;
	@IsEnum(TodoStatusEnum, {
		message: ValidationErrors.isEnum,
	})
	status?: TodoStatusEnum;
}
export class patchTodoDto extends PartialType(postTodoDto) {}
export class countByStatusDto extends PickType(postTodoDto, ["status"]) {}
