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


// id            Int        @id @default(autoincrement())
// name          String
// email         String
// password      String
// createdAt     DateTime   @default(now())
// updatedAt     DateTime   @updatedAt @default(now())
// Pets          Pet[]        @relation(fields: [petId], references: [id])
// petId         Int