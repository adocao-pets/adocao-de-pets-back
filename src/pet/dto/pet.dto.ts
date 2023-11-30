import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsString, IsEnum } from "class-validator";


export enum PetType {
    CAT = 'GATO',
    DOG = 'CACHORRO'
}

export enum PetSize {
    PEQUENO = 'PEQUENO',
    MEDIO = 'MEDIO',
    GRANDE = 'GRANDE'
}

export enum PetGender {
    MACHO = 'MACHO',
    FEMEA = 'FEMEA'
}

export class CreatePetDto {
    constructor(image: string, name: string, gender: string, size: string, age: number, type: PetType, race: string, description: string, userId: number){
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
    readonly gender: string

    @ApiProperty({ enum: ['PEQUENO', 'MEDIO', 'GRANDE']})
    @IsString({ message: 'Tamanho é necessário' })
    @IsEnum(PetSize)
    readonly size: string

    @ApiProperty()
    @IsPositive({ message: 'Idade precisa ser um número positivo' })
    readonly age: number;

    @ApiProperty({ enum: ['CACHORRO', 'GATO']})
    @IsString({ message: 'Tipo do pet é necessário, apenas CACHORRO ou GATO' })
    @IsEnum(PetType)
    readonly type: PetType; //CAT | DOG

    @ApiProperty()
    @IsOptional()
    readonly race: string;

    @ApiProperty()
    @IsString({ message: 'Descriçao é necessário' })
    readonly description: string;

    @ApiProperty()
    @IsNumber()
    readonly userId: number;
}
