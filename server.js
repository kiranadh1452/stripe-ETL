/*----------------------
Dependencies and Imports
------------------------*/
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

// ROUTES
const invoicesRoute = require("./routes/invoicesRoute");
const subscriptionRoute = require("./routes/subscriptionRoute");

// constants
const PORT = 3000;

// configure application
dotenv.config();
const app = express();
app.set("port", PORT);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use routes for subscriptionRoute
app.use("/invoices", invoicesRoute);
app.use("/subscriptions", subscriptionRoute);

// for any endpoint that is not found, follow this route
app.use("*", (req, res) => {
    console.error(`Endpoint not found: ${req.originalUrl}`);
    return res.status(400).json({
        message: "Endpoint not found",
    });
});

// start server
app.listen(PORT, (err) => {
    if (err) {
        console.error("there was a problem", err);
        return;
    }
    console.log(`server listening on ${PORT}`);
});
