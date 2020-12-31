require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routers = require("./routers");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routers);

app.listen(port, () => console.log(`Listening on port: ${port}!`));
