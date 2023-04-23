import { Test, TestingModule } from "@nestjs/testing";
import { TodoServiceDb } from "./todo-service-db.service";

describe("TodoServiceDbService", () => {
	let service: TodoServiceDb;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TodoServiceDb],
		}).compile();

		service = module.get<TodoServiceDb>(TodoServiceDb);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
