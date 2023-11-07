
import { Pet } from "src/pet/entity/pet.entity";

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    Pets?: Pet[];
}
