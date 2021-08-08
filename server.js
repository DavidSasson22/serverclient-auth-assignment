const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./backend/dataBase/mongoose");

const userRouter = require("./backend/routs/user");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "frontend/build")));

  // Handle React routing, return all requests to React app

  app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
