import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'name is required' })
    readonly name: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail({}, { message: 'email is required'})
    readonly email: string;

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'password is required' })
    readonly password: string;
}


