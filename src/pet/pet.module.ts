import { Module } from '@nestjs/common';
import { PetService } from './service/pet.service';

@Module({
  controllers: [],
  providers: [PetService],
})
export class PetModule {}
