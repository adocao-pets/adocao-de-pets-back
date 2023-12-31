import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { CreatePetDto } from 'src/pet/dto/create-pet.dto';
import { UpdatePetDto } from 'src/pet/dto/update-pet.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entity/user.entity';
import { Pet } from 'src/pet/entity/pet.entity';
import { ResponsePetDto } from 'src/pet/dto/pet.response.dto';
import { PaginationDto } from 'src/infra/db/pagination.dto';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private repository: PrismaService) {}

  async create(user: CreateUserDto): Promise<User> {
    const userExists = await this.repository.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (userExists) throw new BadRequestException('User already exists');

    const userCreated = await this.repository.user.create({ data: user });
    return userCreated;
  }

  async login(dto: LoginUserDto): Promise<User> {
    const user = await this.repository.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new BadRequestException('User not exists');

    if (user.password !== dto.password)
      throw new UnauthorizedException('Password Incorrect');

    return user;
  }

  async update(userId: number, user: UpdateUserDto): Promise<User> {
    try {
      const userExists = await this.repository.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExists) throw new BadRequestException('User not found');

      const updateData: UpdateUserDto = {
        name: user.name ?? userExists.name,
        email: user.email ?? userExists.email,
        password: user.password ?? userExists.password,
      };

      return await this.repository.user.update({
        data: updateData,
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async registerPet(pet: CreatePetDto): Promise<Pet> {
    const userExists = await this.repository.user.findUnique({
      where: {
        id: pet.userId,
      },
    });

    if (!userExists) throw new BadRequestException('User not found');

    const petCreated = await this.repository.pet.create({
      data: {
        ...pet,
        userId: pet.userId,
      },
    });
    return petCreated as Pet;
  }

  async updatePet(petId: number, pet: UpdatePetDto): Promise<Pet> {
    try {
      const petExists = await this.repository.pet.findUnique({
        where: {
          id: petId,
        },
      });

      if (!petExists) throw new BadRequestException('Pet not found');

      const updateData: UpdatePetDto = {
        name: pet.name ?? petExists.name,
        gender: pet.gender ?? petExists.gender,
        size: pet.size ?? petExists.size,
        image: pet.image ?? petExists.image,
        age: pet.age ?? petExists.age,
        type: pet.type ?? petExists.type,
        race: pet.race ?? petExists.race,
        description: pet.description ?? petExists.description,
        userId: pet.userId ?? petExists.userId,
      };

      return await this.repository.pet.update({
        data: updateData,
        where: {
          id: petId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removePet(petId: number) {
    try {
      const petExists = await this.repository.pet.findUnique({
        where: {
          id: petId,
        },
      });

      if (!petExists) throw new BadRequestException('Pet not found');

      await this.repository.pet.delete({
        where: {
          id: petId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getPets(
    perPage: number,
    page?: number,
    raceParams?: string,
    genderParams?: string,
    sizeParams?: string,
    typeParams?: string,
    nameParams?: string,
  ): Promise<PaginationDto<ResponsePetDto>> {
    const paginate = createPaginator({ perPage: perPage });
    const where = [
      { race: { contains: raceParams } },
      { gender: { contains: genderParams } },
      { size: { contains: sizeParams?.toUpperCase() } },
      { type: { contains: typeParams?.toUpperCase() } },
      { name: { contains: nameParams } },
    ];

    console.log(where);
    return await paginate<Pet, Prisma.petFindManyArgs>(
      this.repository.pet,
      {
        where: {
          AND: [
            {
              race: raceParams ? { contains: raceParams } : undefined,
              gender: genderParams ? { contains: genderParams } : undefined,
              size: sizeParams ? { contains: sizeParams } : undefined,
              type: typeParams ? { contains: typeParams } : undefined,
              name: nameParams
                ? {
                    contains: nameParams,
                    mode: 'insensitive',
                  }
                : undefined,
            },
          ],
        },
      },
      {
        page: page,
      },
    );
  }

  async getPet(petId: number): Promise<Pet> {
    const pet = await this.repository.pet.findUnique({
      where: {
        id: petId,
      },
    });

    if (!pet) throw new BadRequestException('Pet not found');
    return pet as Pet;
  }

  async getAllUser(): Promise<User[]> {
    return await this.repository.user.findMany();
  }
}
