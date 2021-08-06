const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./dataBase/mongoose");

const userRouter = require("./routs/user");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, "../front/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
