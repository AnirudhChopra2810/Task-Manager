const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const staticPath = path.join(__dirname, "../client/build");
app.use(express.static(staticPath));

app.use("/", todoRouter);
app.use("/", userRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
