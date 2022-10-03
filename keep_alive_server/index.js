import express from "express";
import axios from "axios";
import cors from "cors";

const WAKEUP_TIMER_MIN = process.env.WAKEUP_TIMER_MIN || 0.5;
const PORT = process.env.port || 8888;
const SERVER_URL =
  process.env.SERVER_URL || `http://localhost:8000/wakeup`;

var corsOptions = {
  origin: process.env.SERVER_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

console.log({ WAKEUP_TIMER_MIN, SERVER_URL, PORT });

const wakeup = async () => {
  try {
    console.log("\n** Waking up server...");
    const response = await axios.get(SERVER_URL);
    console.log("** Server response: ", response.data);
    
  } catch (error) {
    console.log("error", error.code)
  }
  
};

const schedule_wakeup = () => {
  setTimeout(async () => {
    await wakeup();
    schedule_wakeup();
  }, WAKEUP_TIMER_MIN * 60 * 1000);
};

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send(`<h1>I'm awake ( ͡° ͜ʖ ͡°)</h1>`);
});

app.use(cors(corsOptions));
app.use(routes);

app.listen(PORT, async () => {
  schedule_wakeup();
  console.log(`Keep alive server listening on port ${PORT}`);
});
