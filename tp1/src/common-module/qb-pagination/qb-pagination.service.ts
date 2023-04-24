import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

export const PAGINATION_SERVICE_TOKEN = "PaginationService";

export const QbPaginationService = <T>(
	repo: Repository<T>,
	restriction: any,
	page?: number,
	pageSize?: number,
) =>
	repo
		.createQueryBuilder()
		.select()
		.where(restriction)
		.orderBy("id")
		.skip(page && pageSize * (page - 1))
		.take(pageSize)
		.getMany();
