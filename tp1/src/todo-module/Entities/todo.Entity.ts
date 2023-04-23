import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Timestampable from "./todoDate";
import { TodoStatusEnum } from "../TodoStatus";
@Entity("todo")
export class TodoEntity extends Timestampable {
	@PrimaryGeneratedColumn("uuid")
	id: string;
	@Column()
	name: string;
	@Column()
	description: string;
	@Column({
		type: "enum",
		enum: TodoStatusEnum,
		default: TodoStatusEnum.waiting,
	})
	status: TodoStatusEnum;
}
