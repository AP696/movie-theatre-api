const { Router } = require("express");
const express = require("express");
const userRouter = Router();
const { check, validationResult } = require("express-validator");
const { User } = require("../models/User");

userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured while retrieving users");
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("User not found");
  }
});

userRouter.get("/:id/shows", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: "shows",
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user.shows);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured while retrieving the users shows");
  }
});

userRouter.put("/:id/shows", async (req, res) => {
  const { title, genre, rating, status } = req.body;
  const userId = req.params.id;

  try {
    let user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    let show = await User.getShows({ where: { title, genre, rating, status } });
    if (show.length === 0) {
      show = await user.createShow({ title, genre, rating, status });
    } else {
      show = show[0];
    }
    res.json(show);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured while updating the user shows");
  }
});

module.exports = { userRouter };
