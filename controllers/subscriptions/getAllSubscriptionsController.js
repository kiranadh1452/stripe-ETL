const stripeHandler = require("../../utils/stripe");

const getAllSubscriptionsController = async (req, res) => {
    const {
        limit,
        customer,
        price,
        status,
        start_after,
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
        status,
        start_after,
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
        data: subscriptions,
        subscriptions: subsData,
    });
};

module.exports = getAllSubscriptionsController;
