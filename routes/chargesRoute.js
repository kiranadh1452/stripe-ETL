const express = require("express");

// middlewares
const {
    nonEmptyPlusDataFormatValidation,
    validationResultHandler,
    dataFormatValidation,
} = require("../middleware/dataFormatValidation");

let router = express.Router();

module.exports = router;
