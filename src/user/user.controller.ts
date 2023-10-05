import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './service/user.service';
import { CreatePetDto } from 'src/pet/dto/pet.dto';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/register-pet')
  registerPet(@Body() createPetDto: CreatePetDto) {
    return this.userService.registerPet(createPetDto);
  }
}
