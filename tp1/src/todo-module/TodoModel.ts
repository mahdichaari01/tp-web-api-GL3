import { v4 } from 'uuid';
export enum TodoStatusEnum {
	'actif' = 'En Cours',
	'waiting' = 'En Attente',
	'done' = 'Finalisé',
}

export class TodoModel {
	id: ReturnType<typeof v4>;
	name: string;
	description: string;
	date_de_creation: Date;
	status: TodoStatusEnum;
	constructor({
		name,
		description,
		status = TodoStatusEnum.waiting,
	}: {
		name?: string;
		description?: string;
		status?: TodoStatusEnum;
	}) {
		this.id = v4();
		this.date_de_creation = new Date();
		this.name = name;
		this.description = description;
		this.status = status;
	}
}
