const axios = require("axios");
const flutter = require("../config/flutter.config.js");

const initializePayment = async (userData) => {
  const data = {
    tx_ref: userData.ref,
    amount: userData.amount,
    currency: "NGN",
    redirect_url: " https://9f28ae6be443bf.lhr.life/payments/verify",
    payment_options: "card",
    customer: {
      email: userData.email,
      name: userData.full_name,
    },
    customizations: {
      title: "Payman CO.",
      description: "Payman Get Flutterwave",
      logo: "https://assets.piedpiper.com/logo.png",
    },
  };

  const config = {
    method: "post",
    url: "https://api.flutterwave.com/v3/payments",
    headers: {
      Authorization: `Bearer ${flutter.FLUTTER_PRIVATE_KEY}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  const response = await axios(config);
  return response.data;
};

const verifyPayment = (transaction_id) => {
  const config = {
    method: "get",
    url: `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
    headers: {
      Authorization: `Bearer ${flutter.FLUTTER_PRIVATE_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const status = axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });

  return status;
};

module.exports = { initializePayment, verifyPayment };
