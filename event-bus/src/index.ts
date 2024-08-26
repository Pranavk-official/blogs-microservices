import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3005;

interface Event {
  type: string;
  data: any;
}

const events: Event[] = [];

app.use(cors());
app.use(express.json());

app.get("/events", (req: Request, res: Response) => {
  res.send(events);
});

app.post("/events", async (req: Request, res: Response) => {
  const event: Event = req.body;

  events.push(event);

  console.log(`Event Recieved: ${event.type}, ${event.data}`);

  // Forward the event to all services
  try {
    await axios.post("http://localhost:3001/events", event);
    await axios.post("http://localhost:3002/events", event);
    await axios.post("http://localhost:4006/events", event);
    await axios.post("http://localhost:3004/events", event);
  } catch (err: any) {
    console.error(`Error sending to service: ${err.message}`);
  }

  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log(`[server]: Event bus is running at http://localhost:${port}`);
});
