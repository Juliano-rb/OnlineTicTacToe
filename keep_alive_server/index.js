import express from "express";
import fetch from "node-fetch";

const WAKEUP_TIMER_MIN = process.env.WAKEUP_TIMER_MIN || 5;
const SERVER_URL =
  process.env.SERVER_URL || "https://velha.onrender.com/wakeup";
const PORT = process.env.port || 8888;

const app = express();

console.log({ WAKEUP_TIMER_MIN, SERVER_URL, PORT });

const wakeup = async () => {
  const response = await fetch(SERVER_URL);
  const json = await response.json();
  console.log("Server response: ", json);
};

const schedule_wakeup = () => {
  setTimeout(async () => {
    await wakeup();
    schedule_wakeup();
  }, WAKEUP_TIMER_MIN * 60 * 1000);
};

app.get("/", (req, res) => {
  res.send("Keep alive server is alive");
});

app.listen(PORT, async () => {
  schedule_wakeup();
  console.log(`Keep alive server listening on port ${PORT}`);
});
