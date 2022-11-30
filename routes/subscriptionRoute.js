const express = require("express");
const { SUBSCRIPTION_PARAMS } = require("../config/params");

// middlewares
const {
    nonEmptyPlusDataFormatValidation,
    validationResultHandler,
    dataFormatValidation,
} = require("../middleware/dataFormatValidation");

// controller
const getAllSubscriptionsController = require("../controllers/subscriptions/getAllSubscriptionsController");

let router = express.Router();

router.get(
    "/",
    dataFormatValidation(SUBSCRIPTION_PARAMS),
    validationResultHandler,
    getAllSubscriptionsController
);

module.exports = router;
