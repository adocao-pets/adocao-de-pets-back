import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsString, IsEnum } from "class-validator";


export enum PetType {
    CAT = 'GATO',
    DOG = 'CACHORRO'
}

export class CreatePetDto {
    constructor(image: string, name: string, age: number, type: PetType, race: string, description: string, userId: number){
        this.image = image || '';
        this.name = name;
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
    @IsString({ message: 'name is required' })
    readonly name: string;

    @ApiProperty()
    @IsOptional()
    @IsPositive({ message: 'age must be a positive number' })
    readonly age: number;

    @ApiProperty({ enum: ['CACHORRO', 'GATO']})
    @IsOptional()
    @IsString({ message: 'type is required, only CACHORRO or GATO' })
    @IsEnum(PetType)
    readonly type: PetType; //CAT | DOG

    @ApiProperty()
    @IsOptional()
    @IsOptional()
    readonly race: string;

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'description is required' })
    readonly description: string;
    
    @IsNumber()
    @IsOptional()
    readonly userId: number;
}
