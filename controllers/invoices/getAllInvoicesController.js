const stripeHandler = require("../../utils/stripe");

const getAllInvoicesController = async (req, res) => {
    try {
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

        // fetch invoices data from stripe
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
        const invoicesArray = fetchedData?.data;
        delete fetchedData.data;
        return res.status(200).json({
            status: "success",
            count: invoicesArray?.length,
            lot_first_invoice: invoicesArray[0]?.id,
            lot_last_invoice: invoicesArray[invoicesArray.length - 1]?.id,
            data: fetchedData,
            invoices: invoicesArray,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = getAllInvoicesController;
