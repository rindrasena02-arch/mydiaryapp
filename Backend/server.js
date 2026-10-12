const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const connectdb = require("./config/dbConnection.js")

dotenv.config();

connectdb();

app.use(express.json());
app.use(cors());

app.use("/api/auth/users",require("./routes/authRoutes.js"));
app.use("/api/dairy",require("./routes/dariyRoutes.js"));

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running On"+ PORT);
});