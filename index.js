const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
var cors = require("cors");

const app = express();
const port = 5000;
const madnessDataFile =path.join(process.cwd(), 'maddness.txt')
app.use(cors());
// Middleware for parsing JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// API endpoint for storing madness values
// Endpoint to get the current madness level
app.get("/get-madness", (req, res) => {
  fs.readFile(madnessDataFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send({ status: "error", message: "Failed to read madness level" });
    }
    res.send({ status: "success", madnessLevel: data.trim() });
  });
});

// Endpoint to store the madness level
app.post("/store-madness", (req, res) => {
  const madLevel = req.body.madLevel;
  console.log("Madness Level Received:", madLevel);
  fs.writeFile(madnessDataFile, madLevel, (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send({ status: "error", message: "Failed to store madness level" });
    }
    res.send({
      status: "success",
      message: `Madness level ${madLevel} stored.`,
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
