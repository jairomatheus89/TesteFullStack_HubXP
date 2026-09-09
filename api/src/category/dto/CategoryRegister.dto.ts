import { Matches, IsString, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

export class CategoryRegister {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Matches(/^[\p{L}0-9]+(?: [\p{L}0-9]+)*$/u, {
    message: "Nao é permitido caracteres especiais ou espaços consecutivos"
  })
  name!: string;
}