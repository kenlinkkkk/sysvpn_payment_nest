export enum PaypalAction {
  CREATE_PRODUCT = 'createProduct',
  DETAIL_PRODUCT = 'detailProduct',
  LIST_PRODUCTS = 'listProducts',
  CREATE_PLAN = 'createPlan',
  LIST_PLANS = 'listPlans',
  DETAIL_PLAN = 'detailPlan',
  ACTIVE_PLAN = 'activePlan',
  DEACTIVE_PLAN = 'deletePlan',
  CREATE_SUBSCRIPTION = 'createSubscription',
  UPDATE_SUBSCRIPTION = 'updateSubscription',
  DETAIL_SUBSCRIPTION = 'detailSubscription',
  ACTIVE_SUBSCRIPTION = 'activeSubscription',
  CANCEL_SUBSCRIPTION = 'cancelSubscription',
  SUSPEND_SUBSCRIPTION = 'suspendSubscription',
  REVISE_SUBSCRIPTION = 'reviseSubscription',
}

export enum UrlRequest {
  SANDBOX = 'https://api-m.sandbox.paypal.com',
  PRODUCTION = 'https://api-m.paypal.com',
}
