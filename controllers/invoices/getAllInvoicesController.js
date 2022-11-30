const stripeHandler = require("../../utils/stripe");

const getAllInvoicesController = async (req, res) => {
    const {
        limit,
        customer,
        subscription,
        invoice_status,
        starting_after,
        ending_before,
        created,
        collection_method,
        due_date,
    } = req.query;

    // fetch subscriptions data from stripe
    const fetchedData = await stripeHandler.retrieveAllInvoices({
        limit,
        customer,
        subscription,
        status: invoice_status,
        starting_after,
        ending_before,
        created,
        collection_method,
        due_date,
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
