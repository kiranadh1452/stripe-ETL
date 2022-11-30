const express = require("express");
const { CHARGE_PARAMS } = require("../config/params");

// middlewares
const {
    nonEmptyPlusDataFormatValidation,
    validationResultHandler,
    dataFormatValidation,
} = require("../middleware/dataFormatValidation");

// controller
const getAllChargesController = require("../controllers/charges/getAllChargesController.js");

let router = express.Router();

router.get(
    "/",
    dataFormatValidation(CHARGE_PARAMS),
    validationResultHandler,
    getAllChargesController
);

module.exports = router;
