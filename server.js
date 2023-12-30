const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const bGet = require("./routes/postroute")

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const db_Uri = process.env.MONGOOSE_URI;
const port = process.env.PORT;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
  .connect(db_Uri)
  .then(() => console.log("DB Connected..."))
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

  app.use("/", bGet)

app.listen(port, () => console.log("Server Started on http://localhost:3000/"));
