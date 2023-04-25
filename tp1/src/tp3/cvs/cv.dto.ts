import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { ValidationErrors } from "../../Messages/ErrorMessages";
import { Cv } from "./entities/cv.entity";

export class CreateCvDto extends Cv {
	@IsString({
		message: ValidationErrors.isString,
	})
	@IsNotEmpty({
		message: ValidationErrors.isNotEmpty,
	})
	name: string;

	@IsString({
		message: ValidationErrors.isString,
	})
	@IsNotEmpty({
		message: ValidationErrors.isNotEmpty,
	})
	firstname: string;

	@IsNumber()
	@IsNotEmpty({
		message: ValidationErrors.isNotEmpty,
	})
	age: number;

	@IsString({
		message: ValidationErrors.isString,
	})
	@IsNotEmpty({
		message: ValidationErrors.isNotEmpty,
	})
	cin: string;

	@IsString({
		message: ValidationErrors.isString,
	})
	@IsNotEmpty({
		message: ValidationErrors.isNotEmpty,
	})
	job: string;

	@IsString({
		message: ValidationErrors.isString,
	})
	@IsNotEmpty({
		message: ValidationErrors.isNotEmpty,
	})
	path: string;
}

export class UpdateCvDto extends PartialType(CreateCvDto) {}

export class AddSkillCvDto {
	@IsString({
		message: ValidationErrors.isString,
	})
	@IsNotEmpty({
		message: ValidationErrors.isNotEmpty,
	})
	@IsUUID()
	skillId: string;
}
