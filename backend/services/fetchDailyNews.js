const NewsModel = require("../models/NewsModel");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const CronJob = require("cron").CronJob;

require("dotenv").config();

const API = process.env.NEWS_API;

// Function will call fetchAndSaveNews() every 24hrs

module.exports = async function fetchDailyNews() {
  try {
    const job = new CronJob(
      // "* * * * *",
      "0 0 * * *",
      async () => {
        let res = await fetchAndSaveNews();

        if (!res) {
          console.log("Data is not saved for today i.e", new Date());
        } else {
          console.log("Data is saved successfully for today i.e", new Date());
        }
      },
      null,
      true
    );
  } catch (err) {
    console.log("error while fetching daily news from external api");
  }
};

// Function fetch the news daily and save them to the DB; if function news saved successfully, function returns true else false;

async function fetchAndSaveNews() {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  let yesterdayDate = date.toISOString().split("T")[0]; //previous date
  try {
    let data = await fetch(
      `https://newsapi.org/v2/everything?q=india&language=en&from=${yesterdayDate}&pageSize=50&apiKey=${API}` // fetching previous date news, so news will not repeat
    );
    data = await data.json();
    let articles;
    if (data.status == "ok") {
      articles = await data.articles; // extracting articles/news from response
    } else {
      console.log("error while fetching daily news from external api");
      return false;
    }

    updatingNullValues(articles); // updating null value to Not Available, and null image to a default image
    let res = await NewsModel.insertMany(articles);

    if (!res) {
      return false;
    }

    return true;
  } catch (err) {
    console.log("error while fetching daily news from external api");
    return false;
  }
}
function updatingNullValues(articles) {
  articles.forEach((news, i) => {
    news.source = news.source?.name || "Not Available"; // extracting out source name from source object as Key 'Source'
    for (let k in news) {
      if (news[k] == null) {
        if (k == "urlToImage") {
          articles[i][k] =
            "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg";
        } else {
          articles[i][k] = "Not Available";
        }
      }
    }
  });
}
