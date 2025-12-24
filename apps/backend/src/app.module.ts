import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}
