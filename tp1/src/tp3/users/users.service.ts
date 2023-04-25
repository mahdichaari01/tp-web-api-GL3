import { Injectable, NotFoundException } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto) {
		const user = new User();
		user.email = createUserDto.email;
		user.username = createUserDto.username;
		user.password = createUserDto.password;
		return this.userRepository.save(user);
	}

	async findAll() {
		return await this.userRepository.find();
	}

	async findOne(id: string) {
		const user = await this.userRepository.findOne({ where: [{ id: id }] });
		if (!user) throw new NotFoundException("User not found.");
		return user;
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.userRepository.findOne({ where: [{ id: id }] });
		if (updateUserDto.password) {
			user.password = updateUserDto.password;
		}
		user.email = updateUserDto.email ?? user.email;
		user.username = updateUserDto.username ?? user.username;
		return this.userRepository.save(user);
	}
	async remove(id: string) {
		return await this.userRepository.delete(id);
	}
}
