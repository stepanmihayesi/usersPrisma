import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AtStrategy, RtStrategy } from '@app/auth/strategies';
import { AccessContorlService } from '@app/shared/access-control.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService, AccessContorlService, AccessContorlService],
})
export class UsersModule {}
