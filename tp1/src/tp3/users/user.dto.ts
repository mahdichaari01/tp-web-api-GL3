import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ValidationErrors as ErrorMessage } from "../../Messages/ErrorMessages";

export class CreateUserDto {
	@IsString({
		message: ErrorMessage.isString,
	})
	@IsNotEmpty({
		message: ErrorMessage.isNotEmpty,
	})
	username: string;

	@IsString({
		message: ErrorMessage.isString,
	})
	@IsNotEmpty({
		message: ErrorMessage.isNotEmpty,
	})
	email: string;

	@IsString({
		message: ErrorMessage.isString,
	})
	@IsNotEmpty({
		message: ErrorMessage.isNotEmpty,
	})
	password: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
