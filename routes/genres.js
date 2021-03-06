const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");
const validateObjectId = require('../middleware/validateObjectId');

// const asyncMiddleware = require("../middleware/async");

// router.get(
//   "/",
//   asyncMiddleware(async (req, res) => {
//     const genres = await Genre.find().sort("name");
//     res.send(genres);
//   })
// );

router.get("/", async (req, res) => {
  const genres = await Genre.find()
    .select("-__v")
    .sort("name");

    console.log(genres);

  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", [auth, validateObjectId], async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) {
    return res.status(404).send(`Genre ${req.params.id} not found`);
  }

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
    return res.status(404).send(`Genre ${req.params.id} not found`);
  }
  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res.status(404).send(`Genre ${req.params.id} not found`);
  }

  res.send(genre);
});

module.exports = router;
