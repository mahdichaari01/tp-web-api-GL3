import { Module } from "@nestjs/common";
import { CvsService } from "./cvs.service";
import { CvsController } from "./cvs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cv } from "./entities/cv.entity";
import { SkillsModule } from "../skills/skills.module";
import { SkillsService } from "../skills/skills.service";

@Module({
	controllers: [CvsController],
	providers: [CvsService],
	imports: [TypeOrmModule.forFeature([Cv]), SkillsModule],
})
export class CvsModule {}
