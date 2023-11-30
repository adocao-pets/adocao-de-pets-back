import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString, IsEnum } from 'class-validator';

export enum PetType {
  CAT = 'GATO',
  DOG = 'CACHORRO',
}

export class CreatePetDto {
  constructor(name: string, age: number, type: PetType, race: string) {
    this.name = name;
    this.age = age;
    this.type = type;
    this.race = race || '';
  }

  @ApiPropertyOptional()
  @IsString({ message: 'name is required' })
  readonly name: string;

  @ApiPropertyOptional()
  @IsPositive({ message: 'age must be a positive number' })
  readonly age: number;

  @ApiPropertyOptional({ enum: ['CACHORRO', 'GATO'] })
  @IsString({ message: 'type is required, only CACHORRO or GATO' })
  @IsEnum(PetType)
  readonly type: PetType; //CAT | DOG

  @ApiPropertyOptional()
  @IsOptional()
  readonly race: string;
}
