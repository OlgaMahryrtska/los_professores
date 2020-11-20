module.exports = (app) => {
  const cities = require("../controllers/city.controller.js");

  var router = require("express").Router();

  // Create new city
  router.post("/", cities.create);

  // Retrieve all cities
  router.get("/", cities.findAll);

  // Retrieve all published cities
  router.get("/published", cities.findAllPublished);

  // Retrieve a single city with id
  router.get("/:id", cities.findOne);

  // Update city with id
  router.put("/:id", cities.update);

  // Delete city with id
  router.delete("/:id", cities.delete);

  // Create  new city
  router.delete("/", cities.deleteAll);

  app.use("/api/cities", router);
};
