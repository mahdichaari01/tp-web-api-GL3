import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	UpdateDateColumn,
} from "typeorm";
export default class Timestampable {
	@Column({ update: false })
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
	@DeleteDateColumn()
	deletedAt: Date;
}
