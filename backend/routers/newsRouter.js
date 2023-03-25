const { Router } = require("express");

const NewsModel = require("../models/NewsModel.js");
const authentication = require("../middlewares/authentication");

const newsRouter = Router();

newsRouter.get("/", authentication, async (req, res) => {
  let { search, sources, limit, page } = req.query;

  let skip = (limit && limit > 0 ? limit : 0) * (page - 1);

  sources = sources != "" ? sources?.split(",") : false;
  try {
    let news = await NewsModel.find({
      $and: [
        { title: { $regex: search ? search : "", $options: "i" } },
        { source: sources ? sources : { $regex: "", $options: "i" } },
      ],
    })
      .limit(limit > 0 ? limit : 0)
      .skip(skip);

    res.send({ status: "success", news, results: news.length });
  } catch (err) {
    return res.send({ status: "error", msg: "error while fetching news" });
  }
});

module.exports = newsRouter;
