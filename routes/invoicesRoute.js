const express = require("express");
const { INVOICE_PARAMS } = require("../config/params");

// middlewares
const {
    nonEmptyPlusDataFormatValidation,
    validationResultHandler,
    dataFormatValidation,
} = require("../middleware/dataFormatValidation");

// controller
const getAllInvoicesController = require("../controllers/invoices/getAllInvoicesController.js");

let router = express.Router();

router.get(
    "/",
    dataFormatValidation(INVOICE_PARAMS),
    validationResultHandler,
    getAllInvoicesController
);
module.exports = router;
