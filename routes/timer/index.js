const route = require("express").Router();
const models = require("../../common/helpers");
const db = require("../../data/dbConfig");

const { authenticate } = require("../../common/authentication");
// var app = require("express")();
// var http = require("http").createServer(app);
// var io = require("socket.io")(http);

let timers = {};

// @route    /api/timer/
// @desc     POST signing up user
// @Access   Public
route.post("/start", authenticate, async (req, res) => {
  const { id } = req.decoded;
  const { description } = req.body;
  try {
    if (!description) {
      const currentTimer = await models
        .findAllBy("timers", { user_id: id })
        .orderBy("created_at", "desc");
      res.json(currentTimer);
    } else {
      const isStarted = await models.findBy("timers", {
        started: true,
        user_id: id
      });
      if (isStarted) {
        const currentTimer = await models
          .findAllBy("timers", { user_id: id })
          .orderBy("created_at", "desc");
        res.json(currentTimer);
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
        res.json(currentTimer);
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }

  //   io.on("connection", function(socket) {
  //     console.log("CLIENT CONNECTED");
  //     socket.on("disconnect", function(data) {
  //       console.log("Client Diconnected");
  //     });

  //     socket.on("start_timer", data => {
  //       if (timers[id]) {
  //         res.json({ message: "Timer already started" });
  //       } else {
  //         clearInterval(timers[id]);
  //         let sec = 0,
  //           min = 0,
  //           hour = 0;

  //         timers[id] = setInterval(() => {
  //           if (sec < 60) {
  //             sec += 1;
  //             io.emit("STARTED_TIMER", {
  //               timer: `${hour}:${min}:${sec}`,
  //               started: true
  //             });
  //             console.log({ timer: `${hour}:${min}:${sec}`, started: true });
  //           } else if (sec === 60) {
  //             sec = 0;
  //             min += 1;
  //             io.emit("STARTED_TIMER", {
  //               timer: `${hour}:${min}:${sec}`,
  //               started: true
  //             });
  //             console.log({ timer: `${hour}:${min}:${sec}`, started: true });
  //           } else if (min < 60) {
  //             io.emit("STARTED_TIMER", {
  //               timer: `${hour}:${min}:${sec}`,
  //               started: true
  //             });
  //             console.log({ timer: `${hour}:${min}:${sec}`, started: true });
  //           } else if (min === 60) {
  //             hour += 1;
  //             min = 0;
  //             sec = 0;
  //             io.emit("STARTED_TIMER", {
  //               timer: `${hour}:${min}:${sec}`,
  //               started: true
  //             });
  //             console.log({ timer: `${hour}:${min}:${sec}`, started: true });
  //           } else {
  //             io.emit("STARTED_TIMER", {
  //               timer: `${hour}:${min}:${sec}`,
  //               started: true
  //             });
  //             console.log({ timer: `${hour}:${min}:${sec}`, started: true });
  //           }
  //         }, 1000);
  //       }
  //       socket.on("stop_timer", data => {
  //         console.log("stop");
  //       });
  //     });
  //   });
  //   res.json({ message: "Timer has started " });
  //   if (!timers[id]) {
  //     http.listen(5000, function() {
  //       console.log("listening on *:5000");
  //     });
  //   }
});

route.post("/stop", authenticate, async (req, res) => {
  const { id } = req.decoded;

  try {
    const isStopped = await models.findBy("timers", {
      started: true,
      user_id: id
    });

    if (!isStopped || !isStopped.started) {
      const currentTimer = await models
        .findAllBy("timers", { user_id: id })
        .orderBy("created_at", "desc");
      res.json(currentTimer);
    } else {
      const stopTimer = await db("timers")
        .where({ user_id: id, started: true })
        .update({ started: false, ended_at: Date.now() });

      if (stopTimer) {
        const currentTimer = await models
          .findAllBy("timers", { user_id: id })
          .orderBy("created_at", "desc");
        res.json(currentTimer);
      } else {
        res.status(400).json({ message: "No Timers Started" });
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
  //   try {
  //     clearInterval(timers[id]);
  //     timers[id] = null;
  //     res.json({ message: "Timer stoped", started: false });
  //   } catch ({ message }) {
  //     res.status(500).json({ message });
  //   }
});

route.get("/", authenticate, async (req, res) => {
  const { id } = req.decoded;

  try {
    const currentTimer = await models
      .findAllBy("timers", { user_id: id })
      .orderBy("created_at", "desc");
    res.json(currentTimer);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = route;
