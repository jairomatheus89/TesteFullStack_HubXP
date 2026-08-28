import { IsMongoId, IsNotEmpty } from "class-validator";

export class CategoryId {

  @IsNotEmpty()
  @IsMongoId()
  id!: string;
}