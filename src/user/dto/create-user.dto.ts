import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @IsString({ message: 'name is required' })
    readonly name: string;

    @IsEmail({}, { message: 'email is required'})
    readonly email: string;

    @IsString({ message: 'password is required' })
    readonly password: string;
}


