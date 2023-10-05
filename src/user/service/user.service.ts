import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { CreatePetDto } from 'src/pet/dto/pet.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';

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

  async registerPet(pet: CreatePetDto): Promise<any> {
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
    return petCreated;
  }
  
}
