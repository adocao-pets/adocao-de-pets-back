import { Pet } from "src/pet/entity/pet.entity";
import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    Pets?: Pet[];
}