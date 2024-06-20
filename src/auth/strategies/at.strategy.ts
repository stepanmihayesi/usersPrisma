import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { JwtPayload } from "@app/auth/types";

@Injectable()
export class AtStrategy extends PassportStrategy( Strategy, 'jwt') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('AT_SECRET'),
        })
    }
    validate(payload: JwtPayload) {
        return payload
    }
}