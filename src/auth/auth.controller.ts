import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { CreateAndAuthUserDto } from '@app/shared/dto/createAndAuthUser.dto';
import { Tokens } from '@app/auth/types';
import { AtGuard, RtGuard } from '@app/shared/guards';
import {
  Public,
  GetCurrentUser,
  GetCurrentUserId,
} from '@app/shared/decorators';
import { Role } from '@app/auth/enums/role.enum';
import { Roles } from '@app/shared/decorators/roles.decorator';
import { AuthGuard } from '@app/shared/guards/auth.guard';
import { RoleGuard } from '@app/shared/guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: CreateAndAuthUserDto): Promise<Tokens> {
    return this.authService.createAccount(dto);
  }
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: CreateAndAuthUserDto): Promise<Tokens> {
    return this.authService.login(dto);
  }
  @Post('logout')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@GetCurrentUserId() userId: number) {
    this.authService.logout(userId);
  }
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
