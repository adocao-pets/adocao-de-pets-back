import { PetType } from "./pet.dto";

export class ResponsePetDto {
    constructor(id: number, image: string, name: string, age: number, type: string, race: string, description: string, createdAt: Date, updatedAt: Date, userId: number){
        this.id = id;
        this.image = image || '';
        this.name = name;
        this.age = age;
        this.type = type;
        this.race = race || '';
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
    }

    readonly id: number;

    readonly image?: string;

    readonly name: string;

    readonly age: number;

    readonly type: string; //CAT | DOG

    readonly race: string;

    readonly description: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly userId: number;
}
