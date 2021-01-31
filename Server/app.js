const express = require("express");
const bodyParser = require("body-parser");
const todoRouter = require("./routes/todoRoutes");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();
const staticPath = path.join(__dirname, "../client/build");

app.use(express.static(staticPath));
app.use(bodyParser.json());

app.use("/", todoRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
