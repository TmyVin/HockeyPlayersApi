const express = require("express");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const { sequelize, players } = require("./models");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

app.post(
  "/api/players",
  [
    check("name").notEmpty().isString(),
    check("jersey").notEmpty().isInt({ min: 0 }),
    check("position").notEmpty().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newPlayerData = req.body;
    try {
      await players.create(newPlayerData);
      res.status(201).send();
    } catch (error) {
      console.error("Error creating player:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.get("/api/players", async (req, res) => {
  try {
    const allPlayers = await players.findAll({
      attributes: ["id", "name", "team", "position", "jersey"],
    });
    res.json(allPlayers);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/players/:playerId", async (req, res) => {
  const playerId = req.params.playerId;
  try {
    const player = await players.findByPk(playerId);
    if (!player) {
      res.status(404).send("Player not found");
    } else {
      res.json(player);
    }
  } catch (error) {
    console.error("Error fetching player:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/players/:playerId", async (req, res) => {
  const playerId = req.params.playerId;
  const updatedPlayer = req.body;
  try {
    const [updatedRowCount] = await players.update(updatedPlayer, {
      where: {
        id: playerId,
      },
    });
    if (updatedRowCount === 0) {
      res.status(404).send("Player not found");
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).send("Internal Server Error");
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing Sequelize:", error);
  });
