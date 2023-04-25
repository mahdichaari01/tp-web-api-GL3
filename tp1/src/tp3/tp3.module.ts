import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { SkillsModule } from "./skills/skills.module";
import { CvsModule } from "./cvs/cvs.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cv } from "./cvs/entities/cv.entity";
import { Skill } from "./skills/entities/skill.entity";
import { User } from "./users/entities/user.entity";

@Module({
	imports: [UsersModule, SkillsModule, CvsModule],
	exports: [UsersModule, SkillsModule, CvsModule],
})
export class Tp3Module {}
