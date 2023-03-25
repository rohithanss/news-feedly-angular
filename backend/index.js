const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const connection = require("./config/db.js"); // Connection to DB
const fetchDailyNews = require("./services/fetchDailyNews.js");
const newsRouter = require("./routers/newsRouter.js");
const userRouter = require("./routers/userRouter.js");

const PORT = process.env.PORT || 7000;

app.use(express.json());

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send(
    `<h1 style="text-align:center">Base endpoint for the news_feedly</h1>`
  );
});

app.use("/user", userRouter);

app.use("/news", newsRouter);

fetchDailyNews();

app.listen(PORT, async () => {
  try {
    await connection;

    console.log("connected to DB Successfully");
  } catch (err) {
    console.log("error while connecting to DB");
  }

  console.log(`Listening at \nhttp://localhost:${PORT}`);
});
