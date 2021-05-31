const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRouter");

const app = express();

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use("/product", productRouter);



const connectionUrl =
"mongodb+srv://voran1234:voranzov1234@cluster0.gi8tk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const startApplication = async () => {
  await mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Successfully connected to MongoDB");
  await app.listen(8000);
  console.log("Listening on 8000...");
};

startApplication();

