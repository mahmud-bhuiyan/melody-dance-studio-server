const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 7000;

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("melody-dance-studio-server is running");
});

app.listen(port, () => {
  console.log(`melody-dance-studio-server is running on port ${port}`);
});
