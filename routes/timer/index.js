const route = require("express").Router();

const models = require("../../common/helpers");
const { authenticate } = require("../../common/authentication");

// @route    /api/timer/start
// @desc     POST to start timer
// @Access   Private
route.post("/start", authenticate, async (req, res) => {
  const { id } = req.decoded;
  const { description } = req.body;

  try {
    // Counting and grouping by task (./common/helpers.js)
    const groupedCategories = await models.groupedCategories(id);

    // Logged in user's timers
    const currentTimer = await models
      .findAllBy("timers", { user_id: id })
      .orderBy("created_at", "desc");

    // if no description, don't start the timer/task
    if (!description) {
      res.json({ currentTimer, groupedCategories });
    } else {
      // Check if the timer has already been started
      const isStarted = await models.findBy("timers", {
        started: true,
        user_id: id
      });

      // If it has, don't start a new one
      if (isStarted) {
        res.json({ currentTimer, groupedCategories });
      } else {
        // if not, Add a new one to the database
        await models.add("timers", {
          description,
          started: true,
          started_at: Date.now(),
          user_id: id
        });

        // Send back all timers and graph data
        res.json({ currentTimer, groupedCategories });
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// @route    /api/timer/stop
// @desc     POST to stop timer
// @Access   Private
route.post("/stop", authenticate, async (req, res) => {
  const { id } = req.decoded;

  try {
    // get the logged in user's started timer
    const isStopped = await models.findBy("timers", {
      started: true,
      user_id: id
    });

    // Counting and grouping by task (./common/helpers.js)
    const groupedCategories = await models.groupedCategories(id);

    // logged in user's timers
    const currentTimer = await models
      .findAllBy("timers", { user_id: id })
      .orderBy("created_at", "desc");

    if (!isStopped || !isStopped.started) {
      // if timer is already stopped, just return timers and chart data
      res.json({ currentTimer, groupedCategories });
    } else {
      // if the timer is started, stop it by updating the row with the timer the task ended
      const stopTimer = await models.update(
        "timers",
        { user_id: id, started: true },
        { started: false, ended_at: Date.now() }
      );

      if (stopTimer) {
        // Send back all timers and graph data
        res.json({ currentTimer, groupedCategories });
      } else {
        res.status(400).json({ message: "No Timers Started" });
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// @route    /api/timer/
// @desc     GET a list of timers
// @Access   Private
route.get("/", authenticate, async (req, res) => {
  const { id } = req.decoded;

  try {
    // Get logged in user's timers
    const currentTimer = await models
      .findAllBy("timers", { user_id: id })
      .orderBy("created_at", "desc");

    // Counting and grouping by task (./common/helpers.js)
    const groupedCategories = await models.groupedCategories(id);

    // returning all loggedin user timers and graph data
    res.json({ currentTimer, groupedCategories });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// @route    /api/timer/:id
// @desc     DELETE to delete timer
// @Access   Private
route.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const user_id = req.decoded.id;

  try {
    // check if the requested timer to be deleted exists
    const exists = await models.findBy("timers", { id, user_id });

    // if the requested timer exists,
    if (exists) {
      // remove it
      await models.remove("timers", { id, user_id });

      // get logged in user's timers
      const currentTimer = await models
        .findAllBy("timers", { user_id })
        .orderBy("created_at", "desc");

      // Counting and grouping by task (./common/helpers.js)
      const groupedCategories = await models.groupedCategories(user_id);

      // returning all loggedin user timers and graph data
      res.json({ currentTimer, groupedCategories });
    } else {
      // If the requested timer to be deleted does not exist, return a 404
      res.status(404).json({ message: "Timer does not exist" });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
module.exports = route;
