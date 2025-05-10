import { Product } from "../entities/Product";
import { AppDataSource } from "../config/data-source";
import { CreateProductDto } from "../common/dtos/create-product.dto";

export class ProductRepository {
  static async findByName(productName: string): Promise<Product | null> {
    return AppDataSource.getRepository(Product).findOne({
      where: { productName },
    });
  }

  static async findById(id: number): Promise<Product | null> {
    return AppDataSource.getRepository(Product).findOne({
      where: { productId: id },
    });
  }

  static async findAll(): Promise<Product[]> {
    return AppDataSource.getRepository(Product).find();
  }

  static async createProduct(product: Product) {
    const response = await AppDataSource.getRepository(Product).save(product);
    return response;
  }

  static async deleteProduct(id: number): Promise<void> {
    await AppDataSource.getRepository(Product).delete(id);
  }
}
