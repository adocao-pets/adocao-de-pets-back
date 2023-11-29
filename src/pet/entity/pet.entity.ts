import { ApiProperty } from "@nestjs/swagger";

export class Pet {
    @ApiProperty()
    id: number;

    @ApiProperty()
    image: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    type: string;

    @ApiProperty()
    race: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    createdAt: Date = new Date();

    @ApiProperty()
    updatedAt: Date = new Date();

    @ApiProperty()
    userId: number;
}