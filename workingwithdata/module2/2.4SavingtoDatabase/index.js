const express = require("express");
const Datastore = require("nedb");

const app = express();

app.listen(3000, () => {
  console.log("listening on port 3000");
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase(); //this will load the database

app.post("/api", (request, response) => {
  console.log(request.body);

  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);

  response.json(data);
});
