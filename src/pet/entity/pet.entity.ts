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


// id            Int      @id @default(autoincrement())
// image         String
// name          String
// age           Int
// type          String
// race          String
// description   String
// createdAt     DateTime @default(now())
// updatedAt     DateTime @updatedAt @default(now())
// user          User     @relation(fields: [userId], references: [id])
// userId        Int