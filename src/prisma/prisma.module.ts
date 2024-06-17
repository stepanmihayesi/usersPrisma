import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';

@Module({
  providers: [PrismaService]
})
export class PrismaModule {}
