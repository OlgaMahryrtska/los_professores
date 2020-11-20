const db = require("../models");
const City = db.cities;

// Create and Save a new city
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a city
  const city = new City({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  // Save city in the database
  city
    .save(city)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the city.",
      });
    });
};

// Retrieve all city from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  City.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cities.",
      });
    });
};

// Find a single city with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  City.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found city with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving city with id=" + id });
    });
};

// Update a city by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  City.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update city with id=${id}. Maybe city was not found!`,
        });
      } else res.send({ message: "City was updated." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating city with id=" + id,
      });
    });
};

// Delete city with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  City.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete city with id=${id}. Maybe city was not found!`,
        });
      } else {
        res.send({
          message: "City was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete city with id=" + id,
      });
    });
};

// Delete all cities from database.
exports.deleteAll = (req, res) => {
  City.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Cities were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cities.",
      });
    });
};

// Find all published cities
exports.findAllPublished = (req, res) => {
  City.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cities.",
      });
    });
};
