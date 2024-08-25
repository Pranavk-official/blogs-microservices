import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { randomBytes } from "crypto";
import { title } from "process";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

type CommentType = {
  id: string;
  content: string;
};

const commentsByPostId: { [key: string]: CommentType[] } = {};

app.get("/posts/:id/comments", (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req: Request, res: Response) => {
  const postId = req.params.id; // Extracting the post ID from the URL parameters
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body; // Corrected destructuring syntax

  // Initialize comments array for the post ID if it doesn't already exist
  if (!commentsByPostId[postId]) {
    commentsByPostId[postId] = [];
  }

  const comment: CommentType = {
    id: commentId,
    content,
  };

  commentsByPostId[postId].push(comment); // Add the new comment to the post's comments array

  res.status(201).send({ id: commentId }); // Send back the ID of the newly added comment
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
