import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Types} from "mongoose";
import { Category } from "../../category/schema/category.schema";

@Schema()
export class Product{
  @Prop({required: true})
  name!: string;

  @Prop({required: true})
  description!: string;

  @Prop({required: true})
  price!: number;

  @Prop({
    type:[{type: MongooseSchema.Types.ObjectId, ref: Category.name}],
    required: true
  })
  categoryIds!: Types.ObjectId[];

  @Prop()
  imageUrl!: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);