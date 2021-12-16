var express = require("express");
var router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

require("dotenv").config();

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/all-users", (req, res) => {
  User.find()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json({ error: err.message });
    });
});

router.get("/all-users/find-by-id/:usersId", (req, res) => {
  User.findById(req.params.usersId)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json({ error: err.message });
    });
});

router.post("/sign-up", function (req, res, next) {
  console.log("BODY", req.body);

  //OPTIONAL destructure the object

  const { username, password, hometown, preferredCamera } = req.body;

  //1. Make sure they have username and password
  //2. encrypt the password
  //3. Save user
  //4/ Create JWT

  if (!username || !password) {
    res.json({ error: "Username and password are required" });
  }

  //Encrypt our password
  //Create salt

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const userToCreate = new User({
    username: username,
    password: hashedPassword,
    hometown: hometown,
    preferredCamera: preferredCamera,
  });

  User.create(userToCreate)
    .then((newlyCreatedUser) => {
      //create and sign our JSON web Token, then pass it to the front end

      //These two things are functionally identical
      console.log(newlyCreatedUser._id);
      console.log(newlyCreatedUser.id);

      const payload = {
        user: {
          id: newlyCreatedUser.id,
        },
      };

      jwt.sign(
        payload, //payload
        process.env.SECRET, //secret to help encrypt jwt
        { expiresIn: 3600000 }, //how long the token lasts
        (err, token) => {
          if (err) throw err;
          else {
            res.json({
              token,
              id: newlyCreatedUser.id,
              success: true,
              username: newlyCreatedUser.username,
            });
          }
        }
      );
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });

  // res.json({ message: 'SUCCESS', user: userToCreate });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.json({ error: "Username and password are required" });
  }

  User.findOne({ username: username })
    .then((foundUser) => {
      //Send back if user doesn't exist
      if (!foundUser) {
        res.json({ message: "Username not found" });
      }

      //Check for proper password

      const passMatch = bcrypt.compareSync(password, foundUser.password);

      if (!passMatch) {
        res.json({ message: "Improper password" });
      }

      //Sign JWT

      const payload = {
        user: {
          id: foundUser.id,
        },
      };

      jwt.sign(
        payload, //payload
        process.env.SECRET, //secret to help encrypt jwt
        { expiresIn: 3600000 }, //how long the token lasts
        (err, token) => {
          if (err) throw err;
          else {
            res.json({ token, id: foundUser.id, success: true });
          }
        }
      );
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/login-test", auth, (req, res) => {
  console.log(req.user);
  User.findById(req.user.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/delete-user", auth, function (req, res, next) {
  console.log("Delete One User:", req.body);

  User.findByIdAndRemove(req.user.id) // type user id
    .then((results) => {
      console.log(" User was deleted", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.post("/update-userId", auth, function (req, res, next) {
  //THIS WORKED!
  console.log("update user:", req.body);

  const { hometown, preferredCamera } = req.body;

  User.findById(req.user.id)
    .then((updatedUser) => {
      (updatedUser.hometown = hometown),
        (updatedUser.preferredCamera = preferredCamera);
      updatedUser
        .save()
        .then((results) => {
          console.log("title was updated", results);
          res.json(results);
        })
        .catch((err) => {
          console.log("Something went wrong", err);
          res.json(err);
        });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

module.exports = router;
