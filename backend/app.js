require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./models");
const routeTodos = require("./routes/todos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", routeTodos);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

// pastikan database connect dulu baru listen
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});