import { Global, Module } from "@nestjs/common";
import { v4 } from "uuid";
import {
	PAGINATION_SERVICE_TOKEN,
	QbPaginationService,
} from "./qb-pagination/qb-pagination.service";
export const UUID_TOKEN = "UUID";

const uuidProvider = {
	provide: UUID_TOKEN,
	useValue: v4,
};
const QbPaginationServiceProvider = {
	provide: PAGINATION_SERVICE_TOKEN,
	useValue: QbPaginationService,
};
@Global()
@Module({
	providers: [uuidProvider, QbPaginationServiceProvider],
	exports: [uuidProvider, QbPaginationServiceProvider],
})
export class CommonModuleModule {}
