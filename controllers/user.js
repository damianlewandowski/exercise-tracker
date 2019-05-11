const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user
    .save()
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(err => {
      console.dir(err);
      res.status(500).json(err);
    });
};

const authenticate = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Internal error, please try again."
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password"
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json(
            new Error({
              error: "Internal error, please try again."
            })
          );
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password"
          });
        } else {
          // Issue token
          const payload = { email };
          const secret = process.env.SECRET;
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h"
          });
          res.cookie("token", token).sendStatus(200);
        }
      });
    }
  });
};

module.exports = {
  register,
  authenticate
};
