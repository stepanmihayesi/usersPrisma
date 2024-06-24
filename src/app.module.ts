import { Module } from '@nestjs/common';
import { AuthModule } from '@app/auth/auth.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from '@app/shared/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available
    }),
    AuthModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
