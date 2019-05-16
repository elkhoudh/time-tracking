const route = require("express").Router();
const models = require("../../common/helpers");
const db = require("../../data/dbConfig");

const { authenticate } = require("../../common/authentication");
// var app = require("express")();
// var http = require("http").createServer(app);
// var io = require("socket.io")(http);

// @route    /api/timer/
// @desc     POST signing up user
// @Access   Public
route.post("/start", authenticate, async (req, res) => {
  const { id } = req.decoded;
  const { description } = req.body;

  try {
    const groupedCategories = await db
      .select("timers.description")
      .count("*")
      .where({ user_id: id })
      .from("timers")
      .groupBy("timers.description");

    const currentTimer = await models
      .findAllBy("timers", { user_id: id })
      .orderBy("created_at", "desc");

    if (!description) {
      const currentTimer = await models
        .findAllBy("timers", { user_id: id })
        .orderBy("created_at", "desc");
      res.json({ currentTimer, groupedCategories });
    } else {
      const isStarted = await models.findBy("timers", {
        started: true,
        user_id: id
      });
      if (isStarted) {
        const currentTimer = await models
          .findAllBy("timers", { user_id: id })
          .orderBy("created_at", "desc");
        res.json({ currentTimer, groupedCategories });
      } else {
        const [startTimer] = await models.add("timers", {
          description,
          started: true,
          started_at: Date.now(),
          user_id: id
        });
        const currentTimer = await models
          .findAllBy("timers", { user_id: id })
          .orderBy("created_at", "desc");
        res.json({ currentTimer, groupedCategories });
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

route.post("/stop", authenticate, async (req, res) => {
  const { id } = req.decoded;

  try {
    const isStopped = await models.findBy("timers", {
      started: true,
      user_id: id
    });

    const groupedCategories = await db
      .select("timers.description")
      .count("*")
      .where({ user_id: id })
      .from("timers")
      .groupBy("timers.description");

    if (!isStopped || !isStopped.started) {
      const currentTimer = await models
        .findAllBy("timers", { user_id: id })
        .orderBy("created_at", "desc");
      res.json({ currentTimer, groupedCategories });
    } else {
      const stopTimer = await db("timers")
        .where({ user_id: id, started: true })
        .update({ started: false, ended_at: Date.now() });

      if (stopTimer) {
        const currentTimer = await models
          .findAllBy("timers", { user_id: id })
          .orderBy("created_at", "desc");
        res.json({ currentTimer, groupedCategories });
      } else {
        res.status(400).json({ message: "No Timers Started" });
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

route.get("/", authenticate, async (req, res) => {
  const { id } = req.decoded;

  try {
    const currentTimer = await models
      .findAllBy("timers", { user_id: id })
      .orderBy("created_at", "desc");

    const groupedCategories = await db
      .select("timers.description")
      .count("*")
      .where({ user_id: id })
      .from("timers")
      .groupBy("timers.description");

    res.json({ currentTimer, groupedCategories });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

route.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const user_id = req.decoded.id;

  try {
    const exists = await models.findBy("timers", { id, user_id });

    if (exists) {
      await models.remove("timers", { id, user_id });

      const currentTimer = await models
        .findAllBy("timers", { user_id })
        .orderBy("created_at", "desc");

      const groupedCategories = await db
        .select("timers.description")
        .count("*")
        .where({ user_id })
        .from("timers")
        .groupBy("timers.description");

      res.json({ currentTimer, groupedCategories });
    } else {
      res.status(404).json({ message: "Timer does not exist" });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
module.exports = route;
