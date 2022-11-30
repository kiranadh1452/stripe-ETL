const stripeHandler = require("../../utils/stripe");

const getAllSubscriptionsController = async (req, res) => {
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
    const subscriptions = await stripeHandler.retrieveAllSubscriptions({
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
    const subsData = subscriptions?.data;
    delete subscriptions.data;
    return res.status(200).json({
        status: "success",
        data: subscriptions,
        first_sub: subsData[0]?.id,
        last_sub: subsData[subsData.length - 1]?.id,
        count: subsData?.length,
        subscriptions: subsData,
    });
};

module.exports = getAllSubscriptionsController;
