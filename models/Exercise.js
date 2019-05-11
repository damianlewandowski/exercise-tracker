const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: [true, "Exercise name is required"],
    maxlength: [128, "Exercise name can't be longer than 128 characters"],
    minlength: [1, "Exercise name must be at least 1 character"]
  },
  sets: {
    type: Number,
    min: [1, "There must be at least 1 set"],
    max: [64, "I don't believe you can do 64 sets of this exercise"],
    required: [true, "Sets are required"]
  },
  reps: {
    type: Number,
    min: [1, "There must be at least 1 rep"],
    max: [256, "I can't believe you can do more than 256 reps"],
    required: [true, "Reps are required"]
  },
  duration: {
    type: Number,
    max: [
      256,
      "I can't believe you can do this exercise for more than 256 minutes"
    ],
    required: [true, "Duration is required"]
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
    min: ["2019-04-16", "This date has already expired"]
  },
  description: {
    type: String,
    max: [1024, "Description can't be longer than 1024 characters"]
  }
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
