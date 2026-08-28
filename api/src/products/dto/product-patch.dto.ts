import { IsArray, IsString, IsNotEmpty, IsNumber, IsMongoId } from "class-validator";

export class ProductPatcher {

  @IsNotEmpty()
  @IsMongoId()
  id!: string;

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
  imageUrl!: string;
}