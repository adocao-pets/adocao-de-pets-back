import { Module } from '@nestjs/common';
import { PetService } from './service/pet.service';
import { PrismaModule } from 'src/infra/db/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [PetService],
})
export class PetModule {}
