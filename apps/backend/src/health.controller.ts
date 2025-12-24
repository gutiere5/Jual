import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async checkHealth() {
    try {
      // Execute a raw query to ensure the DB is actually responding
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'ok',
        database: 'connected'
      };
    } catch (error) {
      throw new InternalServerErrorException('Database connection failed');
    }
  }
}