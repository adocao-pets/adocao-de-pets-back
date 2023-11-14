import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './service/user.service';
import { CreatePetDto } from 'src/pet/dto/pet.dto';
import { ApiBody, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import { Pet } from 'src/pet/entity/pet.entity';
import { ResponsePetDto } from 'src/pet/dto/pet.response.dto';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: User
  })
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Create pet' })
  @ApiBody({ type: CreatePetDto })
  @ApiCreatedResponse({
    description: 'Pet created successfully',
    type: Pet
  })
  @Post('/pet/register')
  registerPet(@Body() createPetDto: CreatePetDto) {
    return this.userService.registerPet(createPetDto);
  }

  @ApiOperation({ summary: 'Delete pet' })
  @ApiBody({ type: String })
  @ApiOkResponse({
    description: 'Pet deleted successfully',
    type: ResponsePetDto
  })
  @Delete('/pet/delete/:id')
  delet(@Param('id') id: string) {
    return this.userService.removePet(+id);
  }

  @ApiOperation({ summary: 'Get all pets' })
  @ApiBody({})
  @ApiOkResponse({
    description: 'All pets available',
    type: ResponsePetDto,
    isArray: true
  })
  @Get('/pet/all')
  getAllPets() {
    return this.userService.getAllPets();
  }

  @ApiOperation({ summary: 'Get pet' })
  @ApiBody({ type: String })
  @ApiOkResponse({
    description: 'Pet found',
    type: ResponsePetDto
  })
  @Get('/pet/:id')
  getPet(@Param('id') id: string) {
    return this.userService.getPet(+id);
  }


}
