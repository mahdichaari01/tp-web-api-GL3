import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	JoinTable,
} from "typeorm";
import { Skill } from "../../skills/entities/skill.entity";
import { User } from "../../users/entities/user.entity";
@Entity("cv")
export class Cv {
	@PrimaryGeneratedColumn("uuid")
	id: string;
	@Column()
	name: string;
	@Column()
	firstname: string;
	@Column()
	age: number;
	@Column()
	cin: string;
	@Column()
	job: string;
	@Column()
	path: string;
	@ManyToOne(() => User, (user) => user.cvs, {
		cascade: ["insert", "update"],
	})
	user: User;

	@ManyToMany((type) => Skill, (skill) => skill.cvs, { eager: true })
	@JoinTable()
	skills: Skill[];
}
