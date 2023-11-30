import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsString, IsEnum } from "class-validator";
import { PetType } from "./pet-type";
import { PetGender } from "./pet-gender";
import { PetSize } from "./pet-size";

export class UpdatePetDto {
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
    @IsOptional()
    @IsString()
    readonly name: string;

    @ApiProperty({ enum: ['MACHO', 'FEMEA']})
    @IsOptional()
    @IsString()
    @IsEnum(PetGender)
    readonly gender: string;

    @ApiProperty({ enum: ['PEQUENO', 'MEDIO', 'GRANDE']})
    @IsOptional()
    @IsString()
    @IsEnum(PetSize)
    readonly size: string;

    @ApiProperty()
    @IsOptional()
    @IsPositive()
    readonly age: number;

    @ApiProperty({ enum: ['CACHORRO', 'GATO']})
    @IsOptional()
    @IsString()
    @IsEnum(PetType)
    readonly type: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly race: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly description: string;
    
    @IsOptional()
    @IsNumber()
    readonly userId: number;
}
