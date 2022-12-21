import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from "src/config";
import { UserService } from "../user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly _userService: UserService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            //@ts-ignore
            req.user = null;
            next();
        }
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decoded = verify(token, JWT_SECRET)
            //@ts-ignore
            req.user = await this._userService.findOne(decoded.id)
            next();
        } catch (error) {
            //@ts-ignore
            req.user = null;
            next();
        }
    }
}