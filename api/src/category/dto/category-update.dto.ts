import { IsMongoId, IsString, IsNotEmpty } from "class-validator";

export class CategoryPatch {

  @IsNotEmpty()
  @IsMongoId()
  id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;
}