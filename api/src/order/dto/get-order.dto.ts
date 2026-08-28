import { IsArray, IsNotEmpty, IsNumber, IsMongoId, IsDate } from "class-validator";

export class OrderIdDto {

  @IsNotEmpty()
  @IsMongoId()
  orderId!: string;

}