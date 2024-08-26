import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

type CommentType = {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
};

const commentsByPostId: { [key: string]: CommentType[] } = {};

app.get("/posts/:id/comments", (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req: Request, res: Response) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];
  const comment: CommentType = {
    id: commentId,
    content,
    status: "pending",
  };
  comments.push(comment);
  commentsByPostId[postId] = comments;

  console.log(comments);

  await axios.post("http://localhost:3005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req: Request, res: Response) => {
  console.log("Received Event", req.body.type);
  console.log(req.body.data);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    console.log(comment);
    if (comment) {
      comment.status = status;

      await axios.post("http://localhost:3005/events", {
        type: "CommentUpdated",
        data: {
          id,
          postId,
          status,
          content,
        },
      });
    }
  }

  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log(
    `[server]: Comments service is running at http://localhost:${port}`
  );
});
