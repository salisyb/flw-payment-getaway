const express = require("express");
const {
  getPayment,
  makePayment,
  verifyPayment,
} = require("../controllers/payments.js");

const router = express.Router();

router.get("/", getPayment);
router.post("/", makePayment);
router.get("/verify", verifyPayment);

module.exports = router;
