import { Injectable } from "@nestjs/common";
import { CreateCvDto, UpdateCvDto, AddSkillCvDto } from "./cv.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { SkillsService } from "../skills/skills.service";
import { Cv } from "./entities/cv.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";

@Injectable()
export class CvsService {
	constructor(
		@InjectRepository(Cv)
		private readonly cvRepository: Repository<Cv>,

		private readonly skillService: SkillsService,
	) {}

	create(createCvDto: CreateCvDto, user: User) {
		const newCv = this.cvRepository.create(createCvDto);
		newCv.user = user;
		return this.cvRepository.save(newCv);
	}

	async addSkill(id: string, addSkillDto: AddSkillCvDto) {
		const skill = await this.skillService.findOne(addSkillDto.skillId);
		const cv = await this.cvRepository.findOneBy({ id });
		if (!cv.skills) cv.skills = [];
		cv.skills.push(skill);
		return this.cvRepository.save(cv);
	}

	findAll() {
		return this.cvRepository.find();
	}

	findOne(id: string) {
		return this.cvRepository.findOneBy({ id });
	}

	update(id: string, updateCvDto: UpdateCvDto) {
		return this.cvRepository.update(id, updateCvDto);
	}

	remove(id: string) {
		return this.cvRepository.delete(id);
	}
}
