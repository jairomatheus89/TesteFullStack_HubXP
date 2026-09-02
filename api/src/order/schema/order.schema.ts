import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Types} from "mongoose";
import { Product } from "../../products/schema/products.schema";

@Schema()
export class Order{

  @Prop({
    type: Date,
    default: Date.now,
    required: true
  })
  date!: Date;

  @Prop({
    type:[
      {
        type: MongooseSchema.Types.ObjectId,
        ref: Product.name,
      },
    ],
    required: true
  })
  products!: Types.ObjectId[];

  @Prop({required: true, type: Number})
  total!: number;

}

export const OrderSchema = SchemaFactory.createForClass(Order);