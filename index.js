const express = require("express");
const cors = require("cors");
const { response } = require('express');
const stripe = require("stripe")(
	"sk_test_51HRIYkAP6Wg5pjiYyJNRuEi8jgVYhkWQcZUA1f0ipZUwkQSuCfHyMJS5w4TgRoBfyXioTyDNDArQgRGbdZkWku0200Yquh5kpq"
);

// API

// App config
const app = express();

// middlewares
app.use(cors({origin: true}));
app.use(cors())
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"))
app.get("/user", (request, response) => response.status(200).send("hello user"))

app.post("/payments/create",(request, response) => {
    const total = request.query.total;

    console.log("Payment Request Recieved BOOM!! for this amount ", total);

    stripe.paymentIntents.create({
        amount: parseInt(total), // in subunits of currency
        currency:"inr"
    })
	.then((paymentIntent) => {
		response.status(201).send({
        		clientSecret: paymentIntent.client_secret
		    })

	} )
	.catch((err) => console.log(err))


})

// listen command
app.listen( process.env.PORT || 7000, () => {
	console.log("server ON PORT >>" + process.env.PORT);
})