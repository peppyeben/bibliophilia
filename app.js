const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 1000;
require("dotenv").config();

const routes = require("./routes/routes");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/api/v1/", routes);
app.use(notFound);
app.use(errorHandler);

// connect db
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening at port ${port}`));
    // app.listen();
  } catch (error) {
    console.log(error);
  }
};

start();
