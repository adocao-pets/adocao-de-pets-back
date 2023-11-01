import { Body, Controller, Delete, Param } from '@nestjs/common';
import { PetService } from '../service/pet.service';

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Delete(':id')
  create(@Param('id') id: string) {
    return "OI"
    return this.petService.removePet(+id);
  }
}
