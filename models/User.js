const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 1;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [5, "Password needs to be at least 5 characters long."],
    maxlength: [64, "Password can't exceed 64 characters"]
  },
  exerciseList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }]
});

UserSchema.pre("save", function(next) {
  // Check if document is new or a new password has been set.
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, SALT_ROUNDS, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

// Authentication
UserSchema.path("email").validate(async value => {
  const emailCount = await mongoose.models.User.countDocuments({
    email: value
  });
  return !emailCount;
}, "Email already exists");

module.exports = mongoose.model("User", UserSchema);
