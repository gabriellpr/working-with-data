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

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) console.error(err);
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  console.log(request.body);

  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);

  console.log(database);

  response.json({
    status: "success",
    timestamp: timestamp,
    latitude: data.lat,
    longitude: data.lon,
    mood: data.vegetable,
  });
});
