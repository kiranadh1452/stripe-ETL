const stripeHandler = require("../../utils/stripe");

const getAllInvoicesController = async (req, res) => {
    const {
        limit,
        customer,
        price,
        status,
        starting_after,
        ending_before,
        current_period_start,
        current_period_end,
        created,
    } = req.query;

    // fetch subscriptions data from stripe
    const fetchedData = await stripeHandler.retrieveAllInvoices({
        limit,
        customer,
        price,
        status,
        starting_after,
        ending_before,
        current_period_start,
        current_period_end,
        created,
    });

    // send response
    const invoicesArray = subscriptions?.data;
    delete fetchedData.data;
    return res.status(200).json({
        status: "success",
        data: fetchedData,
        first_sub: invoicesArray[0]?.id,
        last_sub: invoicesArray[invoicesArray.length - 1]?.id,
        count: invoicesArray?.length,
        invoices: invoicesArray,
    });
};

module.exports = getAllInvoicesController;
