const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");

class UserController {
  static register(req, res) {
    const { name, email, password } = req.body;
    let option = { where: { email } };
    User.findOne(option)
      .then((data) => {
        if (data) {
          res.status(400).json({
            message: "User already exist",
          });
        } else {
          return User.create({ name, email, password });
        }
      })
      .then((user) => {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.SECRET
        );
        res.status(201).json({ name, token });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal server Error",
        });
      });
  }

  static login(req, res) {
    const { email, password } = req.body;
    const option = { where: { email } };
    User.findOne(option)
      .then((user) => {
        if (!user) {
          res.status(404).json({
            message: "Email not found",
          });
        } else {
          if (compare(password, user.password)) {
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
              },
              process.env.SECRET
            );
            res.status(201).json({ email, token });
          } else {
            res.status(400).json({
              message: "Wrong password",
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal server Error",
        });
      });
  }
}

module.exports = UserController;
