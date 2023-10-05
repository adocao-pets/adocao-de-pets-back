export class Pet {
    id: number;
    image: string;
    name: string;
    age: number;
    type: string; //CAT | DOG
    race: string;
    description: string;
    isActive: boolean = true;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    userId: number;
}


// id            Int      @id @default(autoincrement())
// image         String
// name          String
// age           Int
// type          String
// race          String
// description   String
// isActive      Boolean
// createdAt     DateTime @default(now())
// updatedAt     DateTime @updatedAt @default(now())
// user          user     @relation(fields: [userId], references: [id])
// userId        Int