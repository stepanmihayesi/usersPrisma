import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get<string>('AT_SECRET'),
    });
    request.user = payload;
    return true;
  }
}
