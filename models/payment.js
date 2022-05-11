const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  transaction_id: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  full_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  reference: {
    type: String,
    require: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const transactions = mongoose.model("transactions", paymentSchema);
module.exports = transactions;
