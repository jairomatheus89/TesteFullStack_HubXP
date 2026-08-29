import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

//Intern Features
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),

    ProductsModule,
    CategoryModule,
    OrderModule,
    DashboardModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
