import { Skill } from "src/tp3/skills/entities/skill.entity";
import { Cv } from "../../cvs/entities/cv.entity";
import {
	Column,
	OneToMany,
	PrimaryGeneratedColumn,
	Entity,
	ManyToMany,
	JoinTable,
	ManyToOne,
} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;
	@Column()
	username: string;
	@Column()
	password: string;
	@Column()
	email: string;
	@OneToMany((type) => Cv, (cv) => cv.user, { eager: true })
	cvs: Cv[];
}
