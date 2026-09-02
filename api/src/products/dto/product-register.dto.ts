import { IsArray, IsString, IsNotEmpty, IsNumber, IsMongoId, IsOptional } from "class-validator";

export class ProductRegister {

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({each: true})
  categoryIds!: string[];

  @IsNotEmpty()
  @IsString()
  imageUrl?: string;
}