const mongoose = require("mongoose");
const withAuth = require("./middleware");
const userControllers = require("./controllers/user");
const exerciseControllers = require("./controllers/exercise");

const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri, err => {
  if (err) {
    throw err;
  } else {
    console.log(`Succesfully connected to mongodb`);
  }
});

module.exports = app => {
  app.post("/api/register", userControllers.register);

  app.post("/api/authenticate", userControllers.authenticate);

  app.post("/api/exercises", withAuth, exerciseControllers.addExercise);

  app.get(
    "/api/exercises/:from?/:to?/:limit?",
    withAuth,
    exerciseControllers.getExercises
  );

  // Endpoint for freeCodeCamp tests
  app.get(
    "/api/exercises/log/:from?/:to?/:limit?",
    withAuth,
    exerciseControllers.getExercises
  );

  app.get("/api/checkToken", withAuth, (req, res) => {
    res.sendStatus(200);
  });
};
