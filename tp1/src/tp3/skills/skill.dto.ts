import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ValidationErrors } from "../../Messages/ErrorMessages";

export class CreateSkillDto {
	@IsNotEmpty({ message: ValidationErrors.isNotEmpty })
	@IsString({ message: ValidationErrors.isString })
	designation: string;
}

export class UpdateSkillDto {
	@IsNotEmpty({ message: ValidationErrors.isNotEmpty })
	id: string;
	@IsNotEmpty({ message: ValidationErrors.isNotEmpty })
	@IsString({ message: ValidationErrors.isString })
	designation: string;
}
