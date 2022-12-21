import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest()
        if (!req.user)
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
        return true;
    }
}