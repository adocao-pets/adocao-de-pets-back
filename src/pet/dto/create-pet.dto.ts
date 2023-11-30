import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsString, IsEnum } from "class-validator";
import { PetType } from "./pet-type";
import { PetGender } from "./pet-gender";
import { PetSize } from "./pet-size";

export class CreatePetDto {
    constructor(image: string, name: string, gender: PetGender, size: PetSize, age: number, type: PetType, race: string, description: string, userId: number){
        this.userId = userId;
        this.image = image || '';
        this.name = name;
        this.gender = gender;
        this.size = size;
        this.age = age;
        this.type = type;
        this.race = race || '';
        this.description = description;
        this.userId = userId;
    }

    @ApiProperty()
    @IsOptional()
    readonly image?: string;

    @ApiProperty()
    @IsString({ message: 'Nome é necessário' })
    readonly name: string;

    @ApiProperty({ enum: ['MACHO', 'FEMEA']})
    @IsString({ message: 'Gênero é necessário' })
    @IsEnum(PetGender)
    readonly gender: PetGender;

    @ApiProperty({ enum: ['PEQUENO', 'MEDIO', 'GRANDE']})
    @IsString({ message: 'Tamanho é necessário' })
    @IsEnum(PetSize)
    readonly size: PetSize;

    @ApiProperty()
    @IsPositive({ message: 'Idade precisa ser um número positivo' })
    readonly age: number;

    @ApiProperty({ enum: ['CACHORRO', 'GATO']})
    @IsString({ message: 'Tipo do pet é necessário, apenas CACHORRO ou GATO' })
    @IsEnum(PetType)
    readonly type: PetType;

    @ApiProperty()
    @IsOptional()
    @IsOptional()
    readonly race: string;

    @ApiProperty()
    @IsString({ message: 'Descriçao é necessário' })
    readonly description: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    readonly userId: number;
}
