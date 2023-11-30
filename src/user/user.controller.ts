import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './service/user.service';
import { CreatePetDto } from 'src/pet/dto/pet.dto';
import { ApiBody, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import { Pet } from 'src/pet/entity/pet.entity';
import { ResponsePetDto } from 'src/pet/dto/pet.response.dto';
import { PaginationDto } from 'src/infra/db/pagination.dto';

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

  @ApiOperation({ summary: 'Update user' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    description: 'User updated successfully',
    type: User
  })
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(+id, updateUserDto);
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

  @ApiOperation({ summary: 'Update pet' })
  @ApiBody({ type: CreatePetDto })
  @ApiOkResponse({
    description: 'Pet updated successfully',
    type: Pet
  })
  @Patch('/pet/update/:id')
  updatePet(@Param('id') id: string, @Body() updatePetDto: CreatePetDto) {
    return this.userService.updatePet(+id, updatePetDto);
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

  @ApiOperation({ summary: 'Get all pets paginated' })
  @ApiOkResponse({
    description: 'Pets available paginated',
    type: PaginationDto<ResponsePetDto>,
    isArray: true
  })
  @Get('/pet')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'race', required: false })
  @ApiQuery({ name: 'gender', required: false })
  @ApiQuery({ name: 'size', required: false })
  @ApiQuery({ name: 'type', required: false })
  getAllPets(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('race') race?: string,
    @Query('gender') gender?: string,
    @Query('size') size?: string,
    @Query('type') type?: string,) {
    return this.userService.getPets(perPage ?? 10, page ?? 1, race, gender, size, type);
  }

  @ApiOperation({ summary: 'Get pet' })
  @ApiOkResponse({
    description: 'Pet found',
    type: ResponsePetDto
  })

  @Get('/pet/:id')
  getPet(@Param('id') id: string) {
    return this.userService.getPet(+id);
  }
}
