import { IsArray, IsNotEmpty, IsNumber, IsMongoId, IsDate } from "class-validator";

export class OrderCreateDto {

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({each: true})
  products!: string[];

}