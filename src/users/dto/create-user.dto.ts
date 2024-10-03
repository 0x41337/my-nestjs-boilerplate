import { Length, IsEmail, IsString, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Length(5, 30)
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(5, 50)
    name: string
}
