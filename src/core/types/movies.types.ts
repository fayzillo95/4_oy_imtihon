
export enum Subscription_type {
  free = 'free',
  gold = 'gold',
  premium = 'premium',
}

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

export enum QualityType{'240p'="240p", '360p'="360p", '480p'="480p", '720p'="720p", '1080p'="1080p", '4K'='4K'}