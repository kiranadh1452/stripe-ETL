export const SUBSCRIPTION_PARAMS = [
    "limit",
    "customer",
    "price",
    "status",
    "start_after",
    "ending_before",
    "current_period_start",
    "current_period_end",
    "created",
];

export const SUBSCRIPTION_STATUS = [
    "active",
    "past_due",
    "unpaid",
    "canceled",
    "incomplete",
    "incomplete_expired",
    "trialing",
    "all",
    "ended",
];

export const INVOICE_PARAMS = [
    "limit",
    "customer",
    "subscription",
    "status",
    "starting_after",
    "ending_before",
    "created",
    "collection_method",
    "due_date",
];

export const INVOICE_STATUS = [
    "draft",
    "open",
    "paid",
    "uncollectible",
    "void",
    // "all",
];
