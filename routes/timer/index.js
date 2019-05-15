const route = require("express").Router();
const models = require("../../common/helpers");
const { authenticate } = require("../../common/authentication");

// @route    /api/timer/
// @desc     POST signing up user
// @Access   Public

let timers = {};

route.post("/start", authenticate, async (req, res) => {
  let { id } = req.decoded;

  if (timers[id]) {
    res.json({ message: "Timer already started" });
  } else {
    clearInterval(timers[id]);
    let sec = 0,
      min = 0,
      hour = 0;

    try {
      timers[id] = setInterval(() => {
        if (sec < 60) {
          sec += 1;
          console.log(`${hour}:${min}:${sec}`);
        } else if (sec === 60) {
          sec = 0;
          min += 1;
          console.log(`${hour}:${min}:${sec}`);
        } else if (min < 60) {
          console.log(`${hour}:${min}:${sec}`);
        } else if (min === 60) {
          hour += 1;
          min = 0;
          sec = 0;
          console.log(`${hour}:${min}:${sec}`);
        } else {
          console.log(`${hour}:${min}:${sec}`);
        }
      }, 1000);

      res.json({ message: "Timer has started " });
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  }
});

route.post("/stop", authenticate, async (req, res) => {
  const { id } = req.decoded;
  try {
    clearInterval(timers[id]);
    timers[id] = null;
    res.json({ message: "Timer stoped" });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = route;
