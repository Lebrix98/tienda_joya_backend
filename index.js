// Dotenv => Variable de entorno
require("dotenv").config();

// Express JS
const express = require("express");
const app = express();

// Cors
const cors = require("cors");

// Router => File Routes Path
const { router } = require("./src/routes/app");

// Middleware => Log Routes
const { logRoute } = require("./src/middleware/middleware");

// PORT
const PORT = process.env.SVPORT || 3000;

app.listen(PORT, () => {
  console.log(`Server up on port: ${PORT}!!`);
});

app.use(express.json());
app.use(cors());

app.use(logRoute);
app.use("/joyas", router);
