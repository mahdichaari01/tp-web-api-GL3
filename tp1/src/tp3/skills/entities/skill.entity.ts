import { Cv } from "../../cvs/entities/cv.entity";
import {
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	Entity,
	ManyToMany,
} from "typeorm";
@Entity("skill")
export class Skill {
	@PrimaryGeneratedColumn("uuid")
	id: string;
	@Column()
	designation: string;
	@ManyToMany((type) => Cv)
	cvs: Cv[];
}
