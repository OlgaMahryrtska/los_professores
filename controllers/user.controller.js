const User = require("../models/user.model");
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.findall = (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { $regex: new RegExp(username), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving .",
      });
    });
};

exports.update = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      description: req.body.description,
      // imagePath: req.file.path,
    },
    { new: true }
  )
    .select("-__v")
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Error -> cannot update a user with id =" + req.params.id,
          error: "Not found!",
        });
      }
      res.status(200).json({
        message: "Update user successfully with id=" + req.params.id,
        user: user,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error -> Cannot update a user with id " + req.params.id,
        error: err.message,
      });
    });
};

module.exports.update = async function (req, res) {
  try {
    const user = await User.updateOne(
      { _id: req.body.id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          description: req.body.description,
          email: req.body.email,
          city: req.body.city,
          // to upload user picture
          //imagePath: req.file,
        },
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the user.",
    });
  }
};

module.exports.upload = async (req, res) => {
  try {
    user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { imagePath: req.file.path } }
    );
    res.status(200).json({
      message: "Uploaded the picture successfully with user id =" + req.body.id,
    });
    console.log("res.file:", typeof req.body.id);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occured during uploading the picture.",
    });
  }
};
