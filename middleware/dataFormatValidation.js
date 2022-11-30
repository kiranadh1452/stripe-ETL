const { check, validationResult } = require("express-validator");
const { SUBSCRIPTION_STATUS, INVOICE_STATUS } = require("../config/params");
/**
 * description: Function to validate that the data is non-empty
 * Usecase: When all the data sent in the request are needed to be non-empty
 * @param {Array} data - Array of data to be validated
 * @returns {Array} - Array of validation results
 */
const nonEmptyDataValidation = (dataArray) => {
    try {
        const validations = [];
        dataArray.forEach((data) => {
            validations.push(check(data).not().isEmpty());
        });
        return validations;
    } catch (error) {
        return [new Error(error)];
    }
};

/**
 * description: Function to validate that the data is in valid format
 * Usecase: When all the data sent in the request are needed to be of valid format (empty format is allowed)
 * @param {Array} data - Array of data to be validated
 * @returns {Array} - Array of validation results
 */
const dataFormatValidation = (dataArray) => {
    try {
        const validations = [];
        dataArray.forEach((data) => {
            switch (data) {
                case "email":
                    validations.push(
                        check(data)
                            .optional()
                            .isEmail()
                            .withMessage("Invalid email format")
                    );
                    break;

                case "password":
                    validations.push(
                        check(data)
                            .optional()
                            .isLength({ min: 8, max: 20 })
                            .withMessage(
                                "Password must be at between 8 to 20 characters"
                            )
                    );
                    break;

                case "phone":
                case "company_phone":
                    validations.push(
                        check(data)
                            .optional()
                            .isMobilePhone()
                            .withMessage("Invalid phone number format")
                    );
                    break;

                case "limit":
                    validations.push(
                        check(data)
                            .optional()
                            .isInt({ min: 1, max: 100 })
                            .withMessage("Invalid number of shops")
                    );
                    break;

                case "subscription_status":
                    validations.push(
                        check(data)
                            .optional()
                            .isIn(SUBSCRIPTION_STATUS)
                            .withMessage("Invalid account type")
                    );
                    break;

                case "invoice_status":
                    validations.push(
                        check(data)
                            .optional()
                            .isIn(INVOICE_STATUS)
                            .withMessage("Invalid invoice status")
                    );
                    break;

                case "id":
                case "subscription_id":
                case "subscription":
                case "payment_intent":
                case "customer_id":
                case "customer":
                    validations.push(
                        check(data)
                            .optional()
                            .isLength({ min: 8, max: 64 })
                            .withMessage("Invalid ID")
                    );
                    break;

                case "price_ids":
                    validations.push(
                        check(data)
                            .optional()
                            .isArray()
                            .withMessage("Price ids must be array of price ids")
                    );

                    validations.push(
                        check("price_ids.*")
                            .optional()
                            .isLength({ min: 14, max: 64 })
                            .withMessage("Invalid price ID")
                    );
                    break;

                case "sub_items":
                    validations.push(
                        check(data)
                            .optional()
                            .isArray()
                            .withMessage("Sub items must be array of sub items")
                    );

                    // each sub item must have an id (which subscription item to replace ?), and a price_id (which price to replace with ?)
                    validations.push(
                        check("sub_items.*.id")
                            .optional()
                            .isLength({ min: 8, max: 64 })
                            .withMessage("Invalid sub item ID")
                    );

                    validations.push(
                        check("sub_items.*.price")
                            .optional()
                            .isLength({ min: 8, max: 64 })
                            .withMessage("Invalid sub item price ID")
                    );

                    validations.push(
                        check("sub_items.*.quantity")
                            .optional()
                            .isInt({ min: 1, max: 100 })
                            .withMessage("Invalid sub item quantity")
                    );
                    break;

                default:
                    console.log(`No validation for data: ${data}`);
                    break;
            }
        });
        return validations;
    } catch (error) {
        return [new Error(error)];
    }
};

/**
 * description: Function to validate that the data is non-empty and of valid format
 * Usecase: When all the data sent in the request are needed to be non-empty and of valid format
 * @param {Array} data - Array of data to be validated
 * @returns {Array} - Array of validation results
 */
const nonEmptyPlusDataFormatValidation = (dataArray) => {
    const nonEmptyDataValidationArray = nonEmptyDataValidation(dataArray);
    const dataFormatValidationArray = dataFormatValidation(dataArray);
    return [...nonEmptyDataValidationArray, ...dataFormatValidationArray];
};

/**
 * description: Function to handle the validation results
 */
const validationResultHandler = (req, res, next) => {
    try {
        let errorLists = validationResult(req);
        if (errorLists.isEmpty()) {
            return next();
        }
        return res.status(422).json({
            message: "Invalid data format",
            errors: errorLists.array()[0],
        });
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error,
        });
    }
};

module.exports = {
    dataFormatValidation,
    nonEmptyDataValidation,
    validationResultHandler,
    nonEmptyPlusDataFormatValidation,
};
