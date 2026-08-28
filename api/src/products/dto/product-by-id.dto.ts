import { IsMongoId, IsNotEmpty } from "class-validator";

export class ProductId {

  @IsNotEmpty()
  @IsMongoId()
  id!: string;
}