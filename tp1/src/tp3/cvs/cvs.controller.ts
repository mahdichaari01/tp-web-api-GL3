import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Request,
	Delete,
} from "@nestjs/common";
import { CvsService } from "./cvs.service";
import { AddSkillCvDto, CreateCvDto, UpdateCvDto } from "./cv.dto";

@Controller("cvs")
export class CvsController {
	constructor(private readonly cvsService: CvsService) {}

	@Post()
	create(@Body() createCvDto: CreateCvDto, @Request() req: Request) {
		return this.cvsService.create(createCvDto, req["user"]);
	}

	@Get()
	findAll() {
		return this.cvsService.findAll();
	}

	@Post(":id")
	addSkill(@Param("id") id: string, @Body() addSkillDto: AddSkillCvDto) {
		return this.cvsService.addSkill(id, addSkillDto);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.cvsService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateCvDto: UpdateCvDto) {
		return this.cvsService.update(id, updateCvDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.cvsService.remove(id);
	}
}
