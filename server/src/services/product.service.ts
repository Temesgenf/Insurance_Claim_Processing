import { CreateProductDto } from "../common/dtos/create-product.dto";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

class ProductService {
  static async getAllProducts() {
    return ProductRepository.findAll();
  }

  static async getProductByName(productName: string) {
    return ProductRepository.findByName(productName);
  }

  static async getProductById(id: number) {
    return ProductRepository.findById(id);
  }

  static async createProduct(product: Product) {
    return ProductRepository.createProduct(product);
  }

  static async deleteProduct(id: number) {
    return ProductRepository.deleteProduct(id);
  }
}

export default ProductService;
