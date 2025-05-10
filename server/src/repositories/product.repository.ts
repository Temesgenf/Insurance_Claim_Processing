import { Product } from "../entities/Product";
import { AppDataSource } from "../config/data-source";
import { CreateProductDto } from "../common/dtos/create-product.dto";

export class ProductRepository {
  static async findByName(productName: string): Promise<Product | null> {
    return AppDataSource.getRepository(Product).findOne({
      where: { productName },
    });
  }

  static async findAll(): Promise<Product[]> {
    return AppDataSource.getRepository(Product).find();
  }

  static createProduct(dto: CreateProductDto) {
    const response = AppDataSource.getRepository(Product).create(dto);
    console.log("Creating product in repository:", response);
    return response;
  }

  static async deleteProduct(id: number): Promise<void> {
    await AppDataSource.getRepository(Product).delete(id);
  }
}
