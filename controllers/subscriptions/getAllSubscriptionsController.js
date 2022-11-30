const stripeHandler = require("../../utils/stripe");

const getAllSubscriptionsController = async (req, res) => {
    try {
        const {
            limit,
            customer,
            price,
            subscription_status,
            starting_after,
            ending_before,
            current_period_start,
            current_period_end,
            created,
        } = req.query;

        // fetch subscriptions data from stripe
        const subscriptions = await stripeHandler.retrieveAllSubscriptions({
            limit,
            customer,
            price,
            status: subscription_status,
            starting_after,
            ending_before,
            current_period_start,
            current_period_end,
            created,
        });

        // send response
        const subsData = subscriptions?.data;
        delete subscriptions.data;
        return res.status(200).json({
            status: "success",
            count: subsData?.length,
            lot_first_sub: subsData[0]?.id,
            lot_last_sub: subsData[subsData.length - 1]?.id,
            data: subscriptions,
            subscriptions: subsData,
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
