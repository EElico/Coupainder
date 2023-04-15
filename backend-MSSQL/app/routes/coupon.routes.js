module.exports = app => {
  const coupons = require("../controllers/coupon.controller.js");

  var router = require("express").Router();

  // Create a new Coupon
  router.post("/", coupons.create);

  // Retrieve all Coupons
  router.get("/", coupons.findAll);

  // Retrieve all published Coupons
  router.get("/published", coupons.findAllPublished);

  // Retrieve a single Coupon with id
  router.get("/:id", coupons.findOne);

  // Update a Coupon with id
  router.put("/:id", coupons.update);

  // Delete a Coupon with id
  router.delete("/:id", coupons.delete);

  // Delete all Coupons
  router.delete("/", coupons.deleteAll);

  app.use('/api/coupons', router);
};
