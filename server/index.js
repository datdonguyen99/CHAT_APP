const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connect successfully!");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", userRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server start on port ${process.env.PORT}`);
});
