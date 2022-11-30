exports.SUBSCRIPTION_PARAMS = [
    "limit",
    "customer",
    "price",
    "status",
    "starting_after",
    "ending_before",
    "current_period_start",
    "current_period_end",
    "created",
];

exports.SUBSCRIPTION_STATUS = [
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

exports.INVOICE_PARAMS = [
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

exports.INVOICE_STATUS = [
    "draft",
    "open",
    "paid",
    "uncollectible",
    "void",
    // "all",
];

exports.CHARGE_PARAMS = [
    "limit",
    "customer",
    "created",
    "ending_before",
    "starting_after",
    "payment_intent",
    "transfer_group",
];
