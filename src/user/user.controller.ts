import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './service/user.service';
import { CreatePetDto } from 'src/pet/dto/pet.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/pet/register')
  registerPet(@Body() createPetDto: CreatePetDto) {
    return this.userService.registerPet(createPetDto);
  }

  @Delete('/pet/delete/:id')
  delet(@Param('id') id: string) {
    return this.userService.removePet(+id);
  }

  @Get('/pet/all')
  getAllPets() {
    return this.userService.getAllPets();
  }

  @Get('/pet/:id')
  getPet(@Param('id') id: string) {
    return this.userService.getPet(+id);
  }


}
