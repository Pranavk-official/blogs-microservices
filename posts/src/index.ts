import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { randomBytes } from "crypto";

import cors from "cors";

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

app.post("/posts", (req: Request, res: Response) => {
  const id: string = randomBytes(4).toString("hex");
  const { title }: { title: string } = req.body;

  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
