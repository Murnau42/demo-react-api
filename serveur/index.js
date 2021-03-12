// import express (after npm install express)
const express = require("express");
const cors = require("cors");
// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 8080;

//authorise les cross-orign request
app.use(cors());

// create a route for the app
app.get("/", (req, res) => {
  res.send("Les baobabs ne sont pas des arbustes.");
});

app.get("/json", (req, res) => {
  res.send({
    citations: ["Les baobabs ne sont pas des arbustes", "Hello World"],
  });
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
