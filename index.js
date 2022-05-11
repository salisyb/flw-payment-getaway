const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const paymentRoute = require("./routes/payments.js");

const app = express();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.use("/payments", paymentRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "hi!, welcome to payman api.",
    data: { service: "payman.co", version: 1.0 },
  });
});

app.use(function (req, res) {
  res.status(404).json({
    status: 404,
    message: "wrong api endpoint please check the api doc for more info",
  });
});
// Mongo Atlas Cloud Cluster
// const CONNECTION_URL =
//   "mongodb+srv://pgdemoapp:TripleA7@cluster0.wabi8.mongodb.net/paymentget?retryWrites=true&w=majority";

// Mongo local
const CONNECTION_URL = "mongodb://localhost:27017/paymentget";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running at Port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
