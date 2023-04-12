const db = require("../models");
const Coupon = db.coupons;
const Op = db.Sequelize.Op;

// Create and Save a new Coupon
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Coupon
  const coupon = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Coupon in the database
  Coupon.create(coupon)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Coupon."
      });
    });
};

// Retrieve all Coupons from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Coupon.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving coupons."
      });
    });
};

// Find a single Coupon with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Coupon.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Coupon with id=" + id
      });
    });
};

// Update a Coupon by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Coupon.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Coupon was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Coupon with id=${id}. Maybe Coupon was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Coupon with id=" + id
      });
    });
};

// Delete a Coupon with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Coupon.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Coupon was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Coupon with id=${id}. Maybe Coupon was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Coupon with id=" + id
      });
    });
};

// Delete all Coupons from the database.
exports.deleteAll = (req, res) => {
  Coupon.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Coupons were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all coupons."
      });
    });
};

// find all published Coupon
exports.findAllPublished = (req, res) => {
  Coupon.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving coupons."
      });
    });
};
