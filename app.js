const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const url = process.env.URL; //data base url
const connectDB = require("./config/connectdb.js");
const userRoutes = require("./routes/userRoutes.js");

// JSON
app.use(express.json());

// database connection.............
connectDB(url);

// load routes .................
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
