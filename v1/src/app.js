const express = require("express");
const app = express();
const helmet = require("helmet");

const config = require("./config");
const loaders = require("./loaders");

config();
loaders();

const { ContactRoutes } = require("./routes/");

app.use(express.json());
app.use(helmet());

app.use("/contact", ContactRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}!`);
});
