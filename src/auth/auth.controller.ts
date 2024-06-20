import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { AuthDto } from '@app/auth/dto';
import { Tokens } from '@app/auth/types';
import { AuthGuard } from '@nestjs/passport';
import { AtGuard } from '@app/common/guards';
import { Request } from 'express';
import { GetCurrentUserId } from '@app/common/decorators';

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
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens() {
    // return this.authService.refreshTokens();
  }
}
