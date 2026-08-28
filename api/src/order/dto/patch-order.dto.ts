import { IsArray, IsNotEmpty, IsNumber, IsMongoId, IsDate } from "class-validator";

export class OrderPatchDto {

  @IsNotEmpty()
  @IsMongoId()
  id!: string;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({each: true})
  products!: string[];

}