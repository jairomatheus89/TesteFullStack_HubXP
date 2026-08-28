import { Matches, IsString, IsNotEmpty } from "class-validator";

export class CategoryRegister {

  @IsNotEmpty()
  @IsString()
  @Matches(/^[\p{L}0-9 ]+$/u, {
    message: "Nao é permitido caracteres especiais"
  })
  name!: string;
}