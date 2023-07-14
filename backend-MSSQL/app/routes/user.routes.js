module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();


    // login
    router.post("/login",users.login);
    router.post("/register",users.create);
      // find one User
  //router.get("/getuser/:id",users.findUser);

  app.use('/api/users', router);

};
