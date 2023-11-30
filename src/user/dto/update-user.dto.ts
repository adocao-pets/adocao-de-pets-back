import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly password: string;
}


