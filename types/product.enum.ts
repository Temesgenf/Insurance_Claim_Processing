// Shared Product type for both client and server

export interface Product {
  productId: number;
  productCode: string;
  productName: string;
  sumInsured: number;
  basePremium: number;
  premiumRate: string;
  keyBenefits: string[];
  description: string;
}
