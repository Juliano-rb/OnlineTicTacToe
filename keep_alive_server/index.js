import express from "express";
import axios from "axios";

const WAKEUP_TIMER_MIN = process.env.WAKEUP_TIMER_MIN || 0.5;
const PORT = process.env.port || 8888;
const SERVER_URL =
  process.env.SERVER_URL || `http://localhost:8000/wakeup`;

const app = express();

console.log({ WAKEUP_TIMER_MIN, SERVER_URL, PORT });

const wakeup = async () => {
  try {
    console.log("\n** Waking up server...");
    const response = await axios.get(SERVER_URL);
    console.log("** Server response: ", response.data);
    
  } catch (error) {
    console.log("error", error)
  }
  
};

const schedule_wakeup = () => {
  setTimeout(async () => {
    await wakeup();
    schedule_wakeup();
  }, WAKEUP_TIMER_MIN * 60 * 1000);
};

app.get("/", (req, res) => {
  res.send("I'm awake");
});

app.listen(PORT, async () => {
  schedule_wakeup();
  console.log(`Keep alive server listening on port ${PORT}`);
});
