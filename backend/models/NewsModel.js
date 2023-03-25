const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    source: { type: String, default: "Not Available" },
    author: { type: String, default: "Not Available" },
    title: { type: String, default: "Not Available" },
    description: { type: String, default: "Not Available" },
    url: String,
    urlToImage: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg",
    },
    publishedAt: { type: String, default: "Not Available" },
    content: { type: String, default: "Not Available" },
  },
  { timestamps: true }
);

const NewsModel = mongoose.model("news", newsSchema);

module.exports = NewsModel;
