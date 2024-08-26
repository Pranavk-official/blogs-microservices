import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

type PostType = {
  id: string;
  title: string;
};

const posts: { [key: string]: PostType } = {};

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.post("/posts", async (req: Request, res: Response) => {
  const id: string = randomBytes(4).toString("hex");
  const { title }: { title: string } = req.body;
  console.log(req.body);
  console.log(posts);
  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:3005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req: Request, res: Response) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(port, () => {
  console.log(`[server]: Posts service is running at http://localhost:${port}`);
});
