export const PaymentMethodType = {
  GOOGLE_INAPP: {
    key: 'GOOGLE_INAPP',
    value: 'Android',
  },
  APPLE_INAPP: {
    key: 'APPLE_INAPP',
    value: 'Apple',
  },
  APPLE_MACOS: {
    key: 'APPLE_MACOS',
    value: 'Apple',
  },
  PAYPAL: {
    key: 'PAYPAL',
    value: 'Paypal',
  },
  CREDIT_CARD: {
    key: 'CREDIT_CARD',
    value: 'Credit Card',
  },
  CRYPTO: {
    key: 'CRYPTO',
    value: 'Crypto',
  },
};

export enum PaymentStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  COMPLETED = 'completed',
}
