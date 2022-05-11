const axios = require("axios");
const flutter = require("./flutter.js");
const paymentInfo = require("../models/payment.js");
const { json } = require("body-parser");

// clean of the data check for null value or empty string
const isClean = (data) => {
  if (data.full_name === null || data.full_name === "") {
    return 300;
  }
  if (!Number(data.amount)) {
    return 300;
  }
  return true;
};
// generate  11 characters reference id for the payment object
const generateRef = () => {
  const characters = "1234567890abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let x = 0; x < 11; x++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }

  return result;
};

const getPayment = (req, res) => {
  res.send("List of the payment that been made so far");
};

const makePayment = async (req, res) => {
  // get payment information from request data
  // and and check for null or empty strings
  let data = req.body;

  // append reference into the data, for production
  // you should add reference duplicate option so that your
  // transaction reference will be unique
  if (isClean(data)) {
    data["ref"] = `payman-tx-ref-${generateRef()}`;

    // saving info to database before initializing

    // paymentInfo.insertMany(data);
    // const paymentData = new paymentInfo(data);
    // paymentData.save().then(console.log("save into database"));

    try {
      const status = await flutter.initializePayment(data);
      return res.json(status);
    } catch (error) {
      console.log(error);
    }
  }
};

const verifyPayment = async (req, res) => {
  const isCancel = (status) => {
    if (status !== "successful") {
      return true;
    }
  };

  // check if transaction was cancel
  if (isCancel(req.query.status)) {
    return res.json("You have been cancel");
  }
  try {
    const status = await flutter.verifyPayment(req.query.transaction_id);

    //get the data we need from response data
    const data = {
      transaction_id: status.data.id,
      reference: status.data.tx_ref,
      full_name: status.data.customer.name,
      email: status.data.customer.email,
      amount: status.data.amount,
    };

    // if transaction is in the db respond with receipt else save and then respond //
    paymentInfo.find({ reference: data.reference }).then((transaction) => {
      if (transaction.length > 0) {
        return res.status(201).json(transaction);
      }
    });

    paymentInfo
      .insertMany(data)
      .then((receipt) => res.status(201).json(receipt));
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "something is wrong" });
  }
};

module.exports = { getPayment, makePayment, verifyPayment };
