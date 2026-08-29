import { IsArray, IsString, IsNotEmpty, IsNumber, IsMongoId, IsOptional } from "class-validator";

export class ProductPatcher {

  @IsNotEmpty()
  @IsMongoId()
  id!: string;


  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  @IsMongoId({each: true})
  categoryIds?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  imageUrl?: string;
}