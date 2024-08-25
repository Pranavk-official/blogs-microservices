import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3005;

app.use(cors());

app.use(express.json());

app.post("/events", (req: Request, res: Response) => {
  const event = req.body;

  axios.post("http://localhost:3001/events", event);
  axios.post("http://localhost:3002/events", event);
  axios.post("http://localhost:3003/events", event);

  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
