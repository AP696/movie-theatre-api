const { Router } = require("express");
const express = require("express");
const showsRouter = Router();
const { check, validationResult } = require("express-validator");
const { Show } = require("../models/Show");

showsRouter.use(express.json());

showsRouter.get("/", async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Shows not found");
  }
});

showsRouter.get("/:id", async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    res.json(show);
  } catch (err) {
    console.log(err);
    res.status(500).send("Cannot find show");
  }
});

showsRouter.get("/genre/:genre", async (req, res) => {
  try {
    const shows = await Show.findAll({
      where: {
        genre: req.params.genre,
      },
    });
    res.json(shows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Shows not found");
  }
});

showsRouter.put("/:id/rating", async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      res.status(404).send("Show not found");
    } else {
      show.rating = req.body.rating;
      await show.save();
      res.json(show);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Cannot update rating");
  }
});

showsRouter.put("/:id/status", async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      res.status(404).send("Show not found");
    } else {
      show.status = req.body.status;
      await show.save();
      res.json(show);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Cannot update status");
  }
});

showsRouter.delete("/:id", async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      res.status(404).send("Show not found");
    } else {
      await show.destroy();
      res.json({ message: "Show deleted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Cannot delete show");
  }
});
module.exports = { showsRouter };
