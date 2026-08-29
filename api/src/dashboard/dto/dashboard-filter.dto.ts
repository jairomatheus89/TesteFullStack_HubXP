import { IsString, IsDate } from "class-validator";

export class DashboardFilterDto {

  @IsString()
  categoryId?: string;

  @IsString()
  productId?: string;

  @IsDate()
  startDate?: Date;

  @IsDate()
  endDate?: Date;
}