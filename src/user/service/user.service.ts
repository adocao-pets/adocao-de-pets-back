import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { CreatePetDto } from 'src/pet/dto/pet.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';
import { Pet } from 'src/pet/entity/pet.entity';
import { ResponsePetDto } from 'src/pet/dto/pet.response.dto';
import { PaginationDto } from 'src/infra/db/pagination.dto';
import { createPaginator } from 'prisma-pagination';
import { Prisma, pet } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private repository: PrismaService) {}

  async create(user: CreateUserDto): Promise<User> {
    const userExists = await this.repository.user.findUnique({
      where: {
        email: user.email
      }
    })
    if (userExists) throw new BadRequestException('User already exists');

    const userCreated = await this.repository.user.create({ data: user });
    return userCreated;
  }

  async registerPet(pet: CreatePetDto): Promise<Pet> {
    const userExists = await this.repository.user.findUnique({
      where: {
        id: pet.userId
      }
    })

    if (!userExists) throw new BadRequestException('User not found');

    const petCreated = await this.repository.pet.create({ data: {
      ...pet,
      userId: pet.userId
    } });
    return petCreated as Pet;
  }

  async removePet(petId: number) {
    try {
      const petExists = await this.repository.pet.findUnique({
        where: {
          id: petId
        }
      })
      
      if (!petExists) throw new BadRequestException('Pet not found');

      await this.repository.pet.delete({
            where: {
                id: petId
            }
        })
    } catch (error) {
        throw new BadRequestException(error.message)
    }
  }

  async getPets(perPage: number, page: number, raceParams: string, genderParams: string, sizeParams: string, typeParams: string): Promise<PaginationDto<ResponsePetDto>> {
    const paginate = createPaginator({perPage: perPage});

    const where = [
      { race: {contains: raceParams} },
      { gender: {contains: genderParams} },
      { size: {contains: sizeParams.toUpperCase()} },
      { type: {contains: typeParams.toUpperCase()} },
    ]

    return await paginate<Pet, Prisma.petFindManyArgs>(
      this.repository.pet, 
      {
        where: { AND: [
          where[0] ? where[0] : {},
          where[1] ? where[1] : {},
          where[2] ? where[2] : {},
          where[3] ? where[3] : {},
        ]},
      },
      {
        page: page,
      }
    )
  }

  async getPet(petId: number): Promise<Pet> {
    const pet = await this.repository.pet.findUnique({
      where: {
        id: petId
      }
    });

    if (!pet) throw new BadRequestException('Pet not found');
    return pet as Pet;
  }
  
}
