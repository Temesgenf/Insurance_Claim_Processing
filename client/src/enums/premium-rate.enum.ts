// export enum PremiumRate {
//   MONTHLY = 'monthly',
//   QUARTERLY = 'quarterly',
//   ANNUALLY = 'annually',
// }

export const PremiumRate = {
  MONTHLY:'monthly',
  QUARTERLY:'quarterly',
  ANNUALLY:'annually',
} as const;

export type PremiumRate = typeof PremiumRate[keyof typeof PremiumRate];