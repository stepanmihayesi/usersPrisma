import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { AtStrategy, RtStrategy } from '@app/auth/strategies';
import { AccessContorlService } from '@app/shared/access-control.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, AccessContorlService],
})
export class AuthModule {}