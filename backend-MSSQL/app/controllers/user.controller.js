const db = require("../models");

const User = db.user;

const Op = db.Sequelize.Op;

// Create and Save a new user
exports.createNewUser = (req, res) => {     //createNewUser was "creat"
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a user
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  // Save user in the database
  user.createNewUser(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// Find a single user with an username
exports.findUser = (req, res) => {
  const id = req.params.id;

  Coupon.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error finding user with id=" + id
      });
    });
};


// Login
exports.login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  User.findAll({
    where: {
      password: password
      , email: email
    }
  })
    .then(data => {
      res.send(data ? {
        id: data[0]?.id,
        fullname: data[0]?.fullname
        , createdAt: data[0]?.createdAt,
        email: data[0]?.email,
        updatedAt: data[0]?.updatedAt
      } : { success: false });
    })
    .catch(err => {
      debugger;
      res.status(500).send({
        message: err
      });
    });
};

// register
// Create and Save a new User
exports.create = (req, res) => {

  const email = req.body.email;
  // check if email exist
  User.findAll({
    where: {
      email: email
    }
  })
    .then(data => {
      if (data.length > 0) {
        res.send({ errorMessege: "email already exist" })
      } else {
        // Create a Coupon
        const user = {
          fullname: req.body.fullname,
          password: req.body.password,
          email: req.body.email,
        };

        // Creact User in the database
        User.create(user)
          .then(data => {
            res.send({
              id: data.id,
              fullname: data.fullname
              , createdAt: data.createdAt,
              email: data.email,
              updatedAt: data.updatedAt
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User."
            });
          });
      }
    })
    .catch(err => {
      debugger;
      res.status(500).send({
        message: "Error"
      });
    });

};

