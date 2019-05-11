const Exercise = require("../models/Exercise");
const User = require("../models/User");

const addExercise = (req, res) => {
  const { email } = req;
  const { exerciseName, sets, reps, duration, date, description } = req.body;
  const exercise = new Exercise({
    exerciseName,
    sets,
    reps,
    duration,
    date,
    description
  });
  exercise
    .save()
    .then(newExercise => {
      User.findOneAndUpdate(
        {
          email
        },
        { $push: { exerciseList: newExercise._id } }
      )
        .then(() => {
          res.status(200).json(newExercise);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

const getExercises = (req, res) => {
  const { from, to, limit } = req.params;
  console.log(from, to, limit);

  User.findOne({
    email: req.email
  })
    .populate("exerciseList")
    .exec((err, exerciseList) => {
      let { exerciseList: exercises } = exerciseList;
      if (from) {
        const fromDate = new Date(from);
        exercises = exercises.filter(e => e.date >= fromDate);
      }
      if (to) {
        const toDate = new Date(to);
        exercises = exercises.filter(e => e.date <= toDate);
      }
      if (limit) {
        const limitInt = Number.parseInt(limit);
        exercises = exercises.slice(limitInt);
      }
      console.log(exercises);
      res.json(exercises);
    });
};

module.exports = {
  addExercise,
  getExercises
};
