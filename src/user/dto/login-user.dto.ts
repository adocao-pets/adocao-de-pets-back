import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @ApiProperty()
  @IsEmail({}, { message: 'email is required' })
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'password is required' })
  readonly password: string;
}
