export interface Product {
  productId: number;
  productCode: string;
  productName: string;
  sumInsured: number;
  basePremium: number;
  premiumRate: string;
  keyBenefits: string[];
  coverages: string[];
  description: string;
}
