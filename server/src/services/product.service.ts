import { CreateProductDto } from "../common/dtos/create-product.dto";
import { ProductRepository } from "../repositories/product.repository";

class ProductService {
  static async getAllProducts() {
    return ProductRepository.findAll();
  }

  static async getProductByName(productName: string) {
    return ProductRepository.findByName(productName);
  }

  static async createProduct(product: CreateProductDto) {
    console.log("Creating product:", product);
    return ProductRepository.createProduct(product);
  }

  static async deleteProduct(id: number) {
    return ProductRepository.deleteProduct(id);
  }
}

export default ProductService;
