// subscription.model.ts

export enum Subscription_type {
  free = "free",
  gold = "gold",
  premium = "premium",
}

// Object sifatida yozilgan to‘liq subscription muddati va narxlari
export const SubscriptionTime = {
  month: {
    days: 30,
    price: 12000,
  },
  half_year: {
    days: 183,
    price: 60000,
  },
  year: {
    days: 365,
    price: 100000,
  },
} as const;

// Type chiqarsang ham bo‘ladi (keyof typeof SubscriptionTime bilan)
export type SubscriptionPeriod = keyof typeof SubscriptionTime;