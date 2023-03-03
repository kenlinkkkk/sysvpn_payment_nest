export enum PackageTypeSchema {
  GoogleInApp = 'GOOGLE_INAPP',
  AppleInApp = 'APPLE_INAPP',
  AppleMacOS = 'APPLE_MACOS',
  PAYPAL = 'PAYPAL',
}

export enum TimeUnit {
  Second = 'SECOND',
  Minute = 'MINUTE',
  Hour = 'HOUR',
  Day = 'DAY',
  Month = 'MONTH',
  Year = 'YEAR',
}

export enum ItemStatus {
  Active = 1,
  Inactive = 0,
}

export enum PaymentStatus {
  Pending = 'pending',
  Complete = 'complete',
  Canceled = 'canceled',
  Failed = 'failed',
  Approved = 'approved',
  Suspended = 'suspended',
}
