import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { AuthDto } from '@app/auth/dto';
import { Tokens } from '@app/auth/types';
import { AuthGuard } from '@nestjs/passport';
import { AtGuard, RtGuard } from '@app/common/guards';
import { Request } from 'express';
import { Public, GetCurrentUser, GetCurrentUserId } from '@app/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.createAccount(dto);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthDto): Promise<Tokens> {
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
