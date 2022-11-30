const stripeHandler = require("../../utils/stripe");

const getAllSubscriptionsController = async (req, res) => {
    try {
        const {
            limit,
            customer,
            created,
            ending_before,
            starting_after,
            payment_intent,
            transfer_group,
        } = req.query;

        // fetch charges data from stripe
        const fetchedData = await stripeHandler.retrieveAllCharges({
            limit,
            customer,
            created,
            ending_before,
            starting_after,
            payment_intent,
            transfer_group,
        });

        // send response
        const chargesArray = fetchedData?.data;
        delete fetchedData.data;
        return res.status(200).json({
            status: "success",
            count: chargesArray?.length,
            lot_first_charge: chargesArray[0]?.id,
            lot_last_charge: chargesArray[chargesArray.length - 1]?.id,
            data: fetchedData,
            invoices: chargesArray,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = getAllSubscriptionsController;
