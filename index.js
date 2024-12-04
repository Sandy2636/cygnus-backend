const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Routes = require("./Routes/Routes.js");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("DB Connected Successful"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", Routes);
// mongoose.connect();

app.get("/", (req, res) => {
  return res.status(200).json({ status: "success", msg: "App Started!" });
});

app.listen(4000, () => {
  console.log("Backend Started");
});
