import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';


@Injectable()
export class PetService {
    constructor(private repository: PrismaService) {}

     async removePet(petId: number) {
        try {
            return  await this.repository.pet.delete({
                where: {
                    id: petId
                }
            })
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
  
}
