import { PetType } from "./pet.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ResponsePetDto {
    constructor(id: number, image: string, name: string, gender: string, size: string, age: number, type: string, race: string, description: string, createdAt: Date, updatedAt: Date, userId: number){
        this.id = id;
        this.image = image || '';
        this.name = name;
        this.gender = gender;
        this.size = size;
        this.age = age;
        this.type = type;
        this.race = race || '';
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
    }

    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly image?: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly gender: string

    @ApiProperty()
    readonly size: string

    @ApiProperty()
    readonly age: number;

    @ApiProperty()
    readonly type: string;

    @ApiProperty()
    readonly race: string;

    @ApiProperty()
    readonly description: string;
    
    @ApiProperty()
    readonly createdAt: Date;
    
    @ApiProperty()
    readonly updatedAt: Date;
    
    @ApiProperty()
    readonly userId: number;
}
