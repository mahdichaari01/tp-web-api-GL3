import { Module } from "@nestjs/common";
import { SkillsService } from "./skills.service";
import { SkillsController } from "./skills.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Skill } from "./entities/skill.entity";
import { CvsModule } from "../cvs/cvs.module";
import { UsersModule } from "../users/users.module";

@Module({
	controllers: [SkillsController],
	providers: [SkillsService],
	exports: [SkillsService],
	imports: [TypeOrmModule.forFeature([Skill])],
})
export class SkillsModule {}
