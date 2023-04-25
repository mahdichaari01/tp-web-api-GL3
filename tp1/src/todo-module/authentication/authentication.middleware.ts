import {
	Injectable,
	InternalServerErrorException,
	NestMiddleware,
	UnauthorizedException,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

//just for development
const SECRET = "secret";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.headers["authorization"] as string;
			if (!token)
				return next(
					new UnauthorizedException("auth-user header is missing."),
				);
			const decoded = verify(token, SECRET, { algorithms: ["HS256"] });
			if (!decoded)
				return next(new UnauthorizedException("Invalid token."));
			const user = decoded["userID"];
			if (!user) return next(new UnauthorizedException("No user"));
			req["userID"] = user;
			next();
		} catch (err) {
			next(new InternalServerErrorException("Error occured."));
		}
	}
}
