const router = require("express").Router();
const dotenv = require("dotenv");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res, next) => {
  try {
    const source = await stripe.sources.create({
      type: "card",
      token: req.body.tokenId,
    });

    const paymentint = await stripe.paymentIntents.create({
      source: source.id,
      amount: req.body.amount,
      currency: "usd",
    });

    res.status(200).send(paymentint);
  } catch (err) {
    console.log(err, "error occurred");
    res.status(500).send("Error occurred");

    try {
      const paymentConfirm = await stripe.paymentIntents.confirm(
        payment.id,
        { payment_method: "pm_card_visa" }
      );
      res.status(200).send(paymentConfirm);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
});

module.exports = router;

